import { supabase } from "./api";

export const getMenuItems = async () => {
  try {
    const { data, error } = await supabase.from("menuItems").select("*");

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
