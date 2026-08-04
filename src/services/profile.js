import { supabase } from "./api";

export async function getProfile(userId) {
  if (!userId) {
    throw new Error("User id is required to fetch a profile.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
