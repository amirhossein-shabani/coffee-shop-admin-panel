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
  // only allow updating specific fields to avoid sending meta fields
  const allowed = [
    "address",
    "phoneNumber",
    "telephonNumber",
    "email",
    "openTime",
    "closeTime",
    "instageramID",
    "telegramID",
    "landingHyperText",
    "description",
    "logoUrl",
  ];

  const payload = {};
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(updates, key)) {
      payload[key] = updates[key];
    }
  }

  const { data, error } = await supabase
    .from("setting")
    .update(payload)
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export default {
  getSettings,
  updateSettings,
};
