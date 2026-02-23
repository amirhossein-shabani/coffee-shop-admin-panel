import { supabase } from "./api";

// ۱️⃣ خوندن تمام دسته‌بندی‌ها
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

// ۲️⃣ دریافت یک دسته‌بندی با ID
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

// ۳️⃣ اضافه کردن دسته‌بندی جدید
export const createCategory = async (categoryData) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([
        {
          categoryTitle: categoryData.categoryTitle,
          href: categoryData.href || null,
          imgUrl: categoryData.imgUrl || null,
        },
      ])
      .select();

    if (error) {
      console.error("خطا در اضافه کردن دسته‌بندی:", error);
      throw error;
    }

    return data[0];
  } catch (err) {
    console.error("خطای غیرمنتظره:", err);
    throw err;
  }
};

// ۴️⃣ ویرایش دسته‌بندی
export const updateCategory = async (id, categoryData) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .update({
        categoryTitle: categoryData.categoryTitle,
        href: categoryData.href || null,
        imgUrl: categoryData.imgUrl || null,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("خطا در ویرایش دسته‌بندی:", error);
      throw error;
    }

    return data[0];
  } catch (err) {
    console.error("خطای غیرمنتظره:", err);
    throw err;
  }
};

// ۵️⃣ حذف دسته‌بندی
export const deleteCategory = async (id) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("خطا در حذف دسته‌بندی:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("خطای غیرمنتظره:", err);
    throw err;
  }
};
