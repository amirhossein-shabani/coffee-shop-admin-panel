import { supabase } from "./api";

const BUCKET_NAME = "setting";

// get public URL
const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
};

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
  ];

  const payload = {};

  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(updates, key)) {
      payload[key] = updates[key];
    }
  }

  // آپلود لوگوی جدید در صورت وجود
  if (updates.logoUrl instanceof File) {
    const file = updates.logoUrl;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload("logo.jpg", file, {
        upsert: true,
      });

    if (uploadError) throw uploadError;

    payload.logoUrl = getPublicUrl("logo.jpg");
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
