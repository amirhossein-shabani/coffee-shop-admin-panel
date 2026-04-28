import { supabase } from "./api";

const BUCKET_NAME = "categorie-images";

const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
};

// extarct filePath from the public url
const extractFilePath = (url) => {
  if (!url) return null;

  const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;
  const parts = url.split(marker);
  console.log(parts);

  return parts.length > 1 ? parts[1] : null;
};

// Update category image
export const updateCategoryImage = async (file, categoryHref) => {
  try {
    const fileExtension = file.name.split(".").pop();
    console.log(fileExtension);
    const fileName = `${categoryHref}-${Date.now()}.${fileExtension}`;

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
    console.log("خطای آپلود تصویر", err);
    throw err;
  }
};

// Delete category image
export const deleteCategoryImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    const filePath = extractFilePath(imageUrl);
    if (!filePath) return;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.log("خطا در حذف تصویر ", error);
      throw error;
    }
  } catch (err) {
    console.log("خطای حذف تصویر", err);
    throw err;
  }
};

export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("خطای غیرمنتظره:", err);
    throw err;
  }
};

export const getCategoryById = async (id) => {
  try {
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
  } catch (err) {
    console.error("خطای غیرمنتظره:", err);
    throw err;
  }
};

export const getCategoryByHref = async (href) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("href", href);

    if (error) {
      console.error("خطا در دریافت دسته‌بندی:", error);
      throw error;
    }

    return data?.[0] || null;
  } catch (err) {
    console.error("خطای غیرمنتظره:", err);
    throw err;
  }
};

// update the category
export const updateCategory = async ({
  href,
  updateCategoryData,
  imageFile,
  oldImgageUrl,
}) => {
  let newImageUrl = updateCategoryData.imgUrl;

  try {
    // if new image is selected → upload it first
    if (imageFile) {
      newImageUrl = await updateCategoryImage(imageFile, href);
    }

    // update category data in database
    const { data, error } = await supabase
      .from("categories")
      .update({ ...updateCategoryData, imgUrl: newImageUrl })
      .eq("href", href)
      .select()
      .single();

    if (error) {
      // if data in the database failed we rollback the new Image which we uploaded .
      if (imageFile) {
        await deleteCategoryImage(newImageUrl);
      }
      throw error;
    }

    // if everything is ok we delete the old image from the storage
    if (imageFile && oldImgageUrl && oldImgageUrl !== newImageUrl) {
      await deleteCategoryImage(oldImgageUrl);
    }

    return data;
  } catch (err) {
    console.error("خطای آپدیت دسته‌بندی با تصویر:", err);
    throw err;
  }
};
