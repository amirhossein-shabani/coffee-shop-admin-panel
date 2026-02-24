import { supabase } from "./api";

export const getMenuItems = async () => {
  try {
    const { data, error } = await supabase
      .from("menuItems")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("خطا در دریافت آیتم‌های منو:", error);
      throw error;
    }
    return data;
  } catch (err) {
    console.error("خطای غیرمنتظره:", err);
    throw err;
  }
};

export const getMenuItemById = async (id) => {
  const { data, error } = await supabase
    .from("menuItems")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};
