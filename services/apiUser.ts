import supabase from "./supabase";

export default async function getAllUser() {
  const { data, error } = await supabase.from("user").select("*");
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}
