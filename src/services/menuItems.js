import { supabase } from "./api";

const BUCKET_NAME = "items-images";
const DEFAULT_IMAGE_URL =
  "https://flhcfdglalmwmfxnyvhz.supabase.co/storage/v1/object/public/items-images/itemBackupImg.png";

/* ========================== */
/* گرفتن public URL کامل     */
/* ========================== */
const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
};

/* ========================== */
/* استخراج filePath از URL    */
/* ========================== */
const extractFilePath = (url) => {
  if (!url) return null;

  const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;
  const parts = url.split(marker);

  return parts.length > 1 ? parts[1] : null;
};

/* ========================== */
/* آپلود تصویر               */
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

    return getPublicUrl(fileName); // لینک کامل برمی‌گرده
  } catch (err) {
    console.error("خطای آپلود تصویر:", err);
    throw err;
  }
};

/* ========================== */
/* حذف تصویر امن              */
/* ========================== */

export const deleteMenuItemImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // اگر عکس پیش‌فرض است → هیچ کاری نکن
    if (imageUrl === DEFAULT_IMAGE_URL) return;

    const filePath = extractFilePath(imageUrl);
    if (!filePath) return;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error("خطا در حذف تصویر:", error);
      throw error;
    }
  } catch (err) {
    console.error("خطای حذف تصویر:", err);
    throw err;
  }
};

/* ========================== */
/* گرفتن همه آیتم‌ها         */
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
/* گرفتن یک آیتم             */
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
/* آپدیت بدون تصویر          */
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
/* آپدیت همراه تصویر جدید    */
/* ========================== */
export const updateMenuItemWithImage = async ({
  id,
  updateData,
  imageFile,
  oldImageUrl,
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
      .update({ ...updateData, imgUrl: newImageUrl })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // اگر دیتابیس fail شد و ما عکس جدید آپلود کرده بودیم → rollback
      if (imageFile) {
        await deleteMenuItemImage(newImageUrl);
      }
      throw error;
    }

    // 3️⃣ اگر همه چیز موفق بود → عکس قبلی رو حذف کن
    if (imageFile && oldImageUrl && oldImageUrl !== newImageUrl) {
      await deleteMenuItemImage(oldImageUrl);
    }

    return data;
  } catch (err) {
    console.error("خطای آپدیت آیتم با تصویر:", err);
    throw err;
  }
};
