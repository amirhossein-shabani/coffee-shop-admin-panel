import { supabase } from "./api";

const BUCKET_NAME = "categorie-images";

/* ========================== */
/* گرفتن public URL کامل     */
/* ========================== */
const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
};

/* ========================== */
/* استخراج filePath از URL (FIXED) */
/* ========================== */
const extractFilePath = (url) => {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;

    // فقط اسم فایل داخل bucket
    const filePath = path.split(`/${BUCKET_NAME}/`)[1];

    return filePath || null;
  } catch {
    return null;
  }
};

/* ========================== */
/* آپلود تصویر               */
/* ========================== */
export const updateCategoryImage = async (file, categoryId) => {
  try {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${categoryId}-${Date.now()}.${fileExtension}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        upsert: false,
      });

    if (error) {
      console.error("خطا در آپلود تصویر دسته‌بندی:", error);
      throw error;
    }

    return getPublicUrl(fileName);
  } catch (err) {
    console.error("خطای آپلود تصویر", err);
    throw err;
  }
};

/* ========================== */
/* حذف تصویر (FIXED + LOG)   */
/* ========================== */
export const deleteCategoryImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    const filePath = extractFilePath(imageUrl);

    console.log("DELETE IMAGE:");
    console.log("URL:", imageUrl);
    console.log("PATH:", filePath);

    if (!filePath) return;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error("خطا در حذف تصویر ", error);
      throw error;
    }
  } catch (err) {
    console.error("خطای حذف تصویر", err);
    throw err;
  }
};

/* ========================== */
/* گرفتن همه دسته‌بندی‌ها    */
/* ========================== */
export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("خطا در دریافت دسته‌بندی‌ها:", error);
    throw error;
  }

  return data;
};

/* ========================== */
/* گرفتن با id               */
/* ========================== */
export const getCategoryById = async (id) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("خطا در دریافت دسته‌بندی:", error);
    throw error;
  }

  return data;
};

/* ========================== */
/* گرفتن با href             */
/* ========================== */
export const getCategoryByHref = async (href) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("href", href);

  if (error) {
    console.error("خطا در دریافت دسته‌بندی:", error);
    throw error;
  }

  return data?.[0] || null;
};

/* ========================== */
/* آپدیت کامل (FIXED FLOW)   */
/* ========================== */
export const updateCategory = async ({
  id,
  updateCategoryData,
  imageFile,
  oldImgageUrl,
}) => {
  try {
    let newImageUrl = updateCategoryData.imgUrl;

    // ✅ اگر عکس جدید داریم
    if (imageFile) {
      // 1. آپلود عکس جدید
      newImageUrl = await updateCategoryImage(imageFile, id);

      // 2. آپدیت دیتابیس با عکس جدید
      const { data, error } = await supabase
        .from("categories")
        .update({ ...updateCategoryData, imgUrl: newImageUrl })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        // rollback
        await deleteCategoryImage(newImageUrl);
        throw error;
      }

      // 3. حذف عکس قبلی (بدون شرط حساس)
      if (oldImgageUrl) {
        await deleteCategoryImage(oldImgageUrl);
      }

      return data;
    }

    // ✅ اگر عکس جدید نداریم
    const { data, error } = await supabase
      .from("categories")
      .update(updateCategoryData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("خطا در آپدیت دسته‌بندی:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("خطای آپدیت دسته‌بندی با تصویر:", err);
    throw err;
  }
};

/* ========================== */
/* افزودن دسته‌بندی جدید     */
/* ========================== */
export const addCategory = async ({ categoryData, imageFile }) => {
  try {
    let imgUrl = null;
    // اگر عکس وجود دارد، ابتدا آپلود شود
    if (imageFile) {
      // آپلود عکس و گرفتن url
      const tempId = `temp-${Date.now()}`; // id موقت برای نامگذاری عکس
      imgUrl = await updateCategoryImage(imageFile, tempId);
    }

    // حذف id از داده‌های ارسالی اگر وجود دارد
    const { id, ...categoryDataWithoutId } = categoryData || {};

    // درج اطلاعات دسته‌بندی در دیتابیس
    const { data, error } = await supabase
      .from("categories")
      .insert({ ...categoryDataWithoutId, imgUrl })
      .select()
      .single();

    if (error) {
      // اگر عکس آپلود شده بود، حذف شود
      if (imgUrl) await deleteCategoryImage(imgUrl);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("خطا در افزودن دسته‌بندی:", err);
    throw err;
  }
};

/* ========================== */
/* حذف دسته‌بندی             */
/* ========================== */
export const deleteCategory = async (href) => {
  try {
    // دریافت اطلاعات دسته‌بندی برای حذف تصویر
    const category = await getCategoryByHref(href);
    if (category?.imgUrl) {
      await deleteCategoryImage(category.imgUrl);
    }

    // حذف دسته‌بندی از دیتابیس
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("href", href);

    if (error) {
      console.error("خطا در حذف دسته‌بندی:", error);
      throw error;
    }
  } catch (err) {
    console.error("خطای حذف دسته‌بندی:", err);
    throw err;
  }
};
