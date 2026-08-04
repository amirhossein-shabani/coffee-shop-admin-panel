import { supabase } from "./api";

const BUCKET_NAME = "items-images";

const DEFAULT_IMAGE_URL =
  "https://flhcfdglalmwmfxnyvhz.supabase.co/storage/v1/object/public/items-images/itemBackupImg.png";

/* ========================== */
/*  catch public URL       */
/* ========================== */
const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
};

/* ========================== */
/*   extract file path from URL */
/* ========================== */
const extractFilePath = (url) => {
  if (!url) return null;

  try {
    const urlObj = new URL(url);

    // pathname:
    // /storage/v1/object/public/items-images/7-123.png

    const pathParts = urlObj.pathname.split(
      `/storage/v1/object/public/${BUCKET_NAME}/`,
    );

    const filePath = pathParts[1];

    return filePath || null;
  } catch (err) {
    console.error("خطا در استخراج مسیر فایل:", err);
    return null;
  }
};

/* ========================== */
/* upload menu item image       */
/* ========================== */
export const uploadMenuItemImage = async (file, itemId) => {
  try {
    const fileExtension = file.name.split(".").pop();

    const fileName = `${itemId}-${Date.now()}.${fileExtension}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        upsert: false,
      });

    if (error) {
      console.error("خطا در آپلود تصویر:", error);
      throw error;
    }

    return getPublicUrl(fileName);
  } catch (err) {
    console.error("خطای آپلود تصویر:", err);
    throw err;
  }
};

/* ========================== */
/* safe image deletion          */
/* ========================== */
export const deleteMenuItemImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // the default backup image should never be deleted
    if (imageUrl.includes("itemBackupImg.png")) {
      return;
    }

    const filePath = extractFilePath(imageUrl);

    if (!filePath) {
      console.warn("FILE PATH پیدا نشد");
      return;
    }

    // check if file exists before trying to delete
    const folderPath = filePath.includes("/")
      ? filePath.substring(0, filePath.lastIndexOf("/"))
      : "";

    const fileName = filePath.split("/").pop();

    const { data: existingFiles, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folderPath);

    if (listError) {
      console.error("خطا در بررسی فایل:", listError);
    }

    const fileExists = existingFiles?.some((file) => file.name === fileName);

    if (!fileExists) {
      console.warn("فایل داخل باکت پیدا نشد:", fileName);
      return;
    }

    // delete file
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error("خطا در حذف فایل:", error);
      throw error;
    }
  } catch (err) {
    console.error("خطای حذف تصویر:", err);
    throw err;
  }
};

/* ========================== */
/* catch all menu items          */
/* ========================== */
export const getMenuItems = async () => {
  const { data, error } = await supabase
    .from("menuItems")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("خطا در دریافت آیتم‌ها:", error);
    throw error;
  }

  return data;
};

/* ========================== */
/* catch menu item by ID */
/* ========================== */
export const getMenuItemById = async (id) => {
  const { data, error } = await supabase
    .from("menuItems")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

/* ========================== */
/* update menu item with image   */
/* ========================== */
export const updateMenuItemWithImage = async ({
  id,
  updateData,
  imageFile,
  oldImageUrl,
  tag,
}) => {
  let newImageUrl = updateData.imgUrl;

  try {
    // 1️⃣ if we have new image, upload it and get new URL
    if (imageFile) {
      newImageUrl = await uploadMenuItemImage(imageFile, id);
    }

    // 2️⃣ update database with new image URL (if new image uploaded) or old image URL (if no new image)
    const { data, error } = await supabase
      .from("menuItems")
      .update({
        ...updateData,
        imgUrl: newImageUrl,
        tag,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // rollback
      if (imageFile) {
        await deleteMenuItemImage(newImageUrl);
      }

      throw error;
    }

    // 3️⃣ delete last image (if new image uploaded and old image exists and is different from new one)
    if (imageFile && oldImageUrl && oldImageUrl !== newImageUrl) {
      await deleteMenuItemImage(oldImageUrl);
    }

    return data;
  } catch (err) {
    console.error("خطای آپدیت آیتم با تصویر:", err);
    throw err;
  }
};

/* ========================== */
/* add menu item with image   */
/* ========================== */
export const addMenuItemWithImage = async ({
  name,
  price,
  description,
  imgUrl,
  imageFile,
  tag,
}) => {
  let newImageUrl = imgUrl || DEFAULT_IMAGE_URL;

  try {
    // 1️⃣ uplaod (if image selected)
    if (imageFile) {
      const tempId = Date.now();
      newImageUrl = await uploadMenuItemImage(imageFile, tempId);
    }

    // 2️⃣ find the last order for the same category (tag)
    const { data: lastItem, error: fetchError } = await supabase
      .from("menuItems")
      .select("display_order")
      .eq("tag", tag)
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    // 3️⃣ calculate next order
    const nextOrder = lastItem?.display_order ? lastItem.display_order + 1 : 1;

    // 4️⃣ insert new item
    const { data, error } = await supabase
      .from("menuItems")
      .insert({
        name,
        price,
        description,
        imgUrl: newImageUrl,
        tag,
        display_order: nextOrder, // ⭐ مهم‌ترین خط
      })
      .select()
      .single();

    if (error) {
      if (imageFile) {
        await deleteMenuItemImage(newImageUrl);
      }
      throw error;
    }

    return data;
  } catch (err) {
    console.error("خطای اضافه کردن آیتم با تصویر:", err);
    throw err;
  }
};

/* ========================== */
/* delete menu item with image         */
/* ========================== */
export const deleteMenuItemById = async ({ id, imageUrl }) => {
  try {
    // first delete image (if exists)
    if (imageUrl && !imageUrl.includes("itemBackupImg.png")) {
      await deleteMenuItemImage(imageUrl);
    }

    // then delete database record
    const { data, error } = await supabase
      .from("menuItems")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("خطا در حذف آیتم:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("خطای حذف آیتم و عکس:", err);
    throw err;
  }
};

/* ========================== */
/* update suggested items         */
/* ========================== */
export const updateSuggestedItems = async (suggestedIds) => {
  try {
    // Get all menu items
    const { data: allItems, error: fetchError } = await supabase
      .from("menuItems")
      .select("id");

    if (fetchError) throw fetchError;

    // Set all items to suggested = false
    const { error: resetError } = await supabase
      .from("menuItems")
      .update({ suggested: false })
      .in(
        "id",
        allItems.map((item) => item.id),
      );

    if (resetError) throw resetError;

    // Set only selected items to suggested = true
    if (suggestedIds.length > 0) {
      const { error: updateError } = await supabase
        .from("menuItems")
        .update({ suggested: true })
        .in("id", suggestedIds);

      if (updateError) throw updateError;
    }

    return { success: true };
  } catch (err) {
    console.error("خطای آپدیت آیتم‌های پیشنهادی:", err);
    throw err;
  }
};
