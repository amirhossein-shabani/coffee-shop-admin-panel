import { supabase } from "./api";

/**
 * اولین بار اجرا کن تا تمام items را suggested = false کند
 */
export const initializeSuggestedItems = async () => {
  try {
    const { error } = await supabase
      .from("menuItems")
      .update({ suggested: false })
      .not("id", "is", null); // تمام rows

    if (error) throw error;

    console.log("✅ تمام آیتم‌ها به suggested = false تنظیم شدند");
    return { success: true };
  } catch (err) {
    console.error("❌ خطا در مهاجرت:", err);
    throw err;
  }
};
