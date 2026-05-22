import { supabase } from "./api";

const BUCKET_NAME = "items-images";

const DEFAULT_IMAGE_URL =
  "https://flhcfdglalmwmfxnyvhz.supabase.co/storage/v1/object/public/items-images/itemBackupImg.png";

/* ========================== */
/* گرفتن public URL کامل      */
/* ========================== */
const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
};

/* ========================== */
/* استخراج filePath از URL     */
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
/* آپلود تصویر                */
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
/* حذف تصویر امن               */
/* ========================== */
export const deleteMenuItemImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // عکس پیش‌فرض حذف نشود
    if (imageUrl.includes("itemBackupImg.png")) {
      return;
    }

    const filePath = extractFilePath(imageUrl);

    console.log("DELETE IMAGE URL:", imageUrl);
    console.log("DELETE FILE PATH:", filePath);

    if (!filePath) {
      console.warn("FILE PATH پیدا نشد");
      return;
    }

    // چک وجود فایل
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

    console.log("FILES IN BUCKET:", existingFiles);

    const fileExists = existingFiles?.some((file) => file.name === fileName);

    if (!fileExists) {
      console.warn("فایل داخل باکت پیدا نشد:", fileName);
      return;
    }

    // حذف فایل
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    console.log("DELETE RESULT:", data);

    if (error) {
      console.error("خطا در حذف فایل:", error);
      throw error;
    }

    console.log("تصویر با موفقیت حذف شد");
  } catch (err) {
    console.error("خطای حذف تصویر:", err);
    throw err;
  }
};

/* ========================== */
/* گرفتن همه آیتم‌ها          */
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
/* گرفتن یک آیتم              */
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
/* آپدیت بدون تصویر           */
/* ========================== */
export const updateMenuItem = async ({ id, updateData }) => {
  const { data, error } = await supabase
    .from("menuItems")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("خطا در آپدیت آیتم", error);
    throw error;
  }

  return data;
};

/* ========================== */
/* آپدیت همراه تصویر جدید     */
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
    // 1️⃣ اگر عکس جدید انتخاب شده → اول آپلود کن
    if (imageFile) {
      newImageUrl = await uploadMenuItemImage(imageFile, id);
    }

    // 2️⃣ دیتابیس رو آپدیت کن
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

    // 3️⃣ حذف عکس قبلی
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
/* اضافه کردن آیتم            */
/* ========================== */
export const addMenuItem = async ({
  name,
  price,
  imgUrl,
  description,
  tag,
}) => {
  const { data, error } = await supabase
    .from("menuItems")
    .insert({
      name,
      price,
      imgUrl,
      description,
      tag,
    })
    .select()
    .single();

  if (error) {
    console.error("خطا در اضافه کردن آیتم جدید:", error);
    throw error;
  }

  return data;
};

/* ========================== */
/* اضافه کردن آیتم با تصویر   */
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
    if (imageFile) {
      const tempId = Date.now();

      newImageUrl = await uploadMenuItemImage(imageFile, tempId);
    }

    const { data, error } = await supabase
      .from("menuItems")
      .insert({
        name,
        price,
        description,
        imgUrl: newImageUrl,
        tag,
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
/* حذف آیتم همراه عکس         */
/* ========================== */
export const deleteMenuItemById = async ({ id, imageUrl }) => {
  try {
    // اول عکس حذف شود
    if (imageUrl && !imageUrl.includes("itemBackupImg.png")) {
      await deleteMenuItemImage(imageUrl);
    }

    // بعد آیتم حذف شود
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
