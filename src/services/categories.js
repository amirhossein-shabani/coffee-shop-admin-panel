import { supabase } from "./api";

const BUCKET_NAME = "categorie-images";

/* ========================== */
/* Get full public URL       */
/* ========================== */
const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
};

/* ========================== */
/* Extract filePath from URL (FIXED) */
/* ========================== */
const extractFilePath = (url) => {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;

    // only the filename inside the bucket
    const filePath = path.split(`/${BUCKET_NAME}/`)[1];

    return filePath || null;
  } catch {
    return null;
  }
};

/* ========================== */
/* Upload image              */
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
/* Delete image (FIXED + LOG) */
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
/* Get all categories        */
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
/* Get by id                 */
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
/* Get by href               */
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
/* Full update (FIXED FLOW)   */
/* ========================== */
export const updateCategory = async ({
  id,
  updateCategoryData,
  imageFile,
  oldImgageUrl,
}) => {
  try {
    let newImageUrl = updateCategoryData.imgUrl;

    // ✅ If we have a new image
    if (imageFile) {
      // 1. Upload the new image
      newImageUrl = await updateCategoryImage(imageFile, id);

      // 2. Update the database with the new image
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

      // 3. Delete the previous image (no strict condition)
      if (oldImgageUrl) {
        await deleteCategoryImage(oldImgageUrl);
      }

      return data;
    }

    // ✅ If we don't have a new image
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
/* Add new category         */
/* ========================== */
export const addCategory = async ({ categoryData, imageFile }) => {
  try {
    let imgUrl = null;
    let displayOrder = 1;

    // Determine next display_order based on current highest value
    const { data: lastCategory, error: orderError } = await supabase
      .from("categories")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (orderError) {
      console.error("خطا در دریافت display_order آخرین دسته‌بندی:", orderError);
      throw orderError;
    }

    if (lastCategory?.display_order != null) {
      displayOrder = lastCategory.display_order + 1;
    }

    // If an image exists, upload it first
    if (imageFile) {
      // Upload image and get url
      const tempId = `temp-${Date.now()}`; // temporary id for naming the image
      imgUrl = await updateCategoryImage(imageFile, tempId);
    }

    // remove id and display_order from submitted data if present
    const { id: _id, ...categoryDataWithoutId } = categoryData || {};

    // insert category data into the database
    const { data, error } = await supabase
      .from("categories")
      .insert({ ...categoryDataWithoutId, imgUrl, display_order: displayOrder })
      .select()
      .single();

    if (error) {
      // if an image was uploaded, delete it
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
/* Delete category           */
/* ========================== */
export const deleteCategory = async (href) => {
  try {
    // fetch category data to delete its image
    const category = await getCategoryByHref(href);
    if (category?.imgUrl) {
      await deleteCategoryImage(category.imgUrl);
    }

    // delete category from database
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
