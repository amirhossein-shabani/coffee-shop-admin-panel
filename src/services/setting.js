import { supabase } from "./api";

export async function getSettings() {
  const { data, error } = await supabase
    .from("setting")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) throw error;

  return data;
}

export async function updateSettings(updates) {
  const { data, error } = await supabase
    .from("setting")
    .update(updates)
    .eq("id", 1)
    .select()
    .single();

  return { data, error };
}

export default {
  getSettings,
  updateSettings,
};
