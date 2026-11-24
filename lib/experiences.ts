import { supabaseServer } from "./supabaseServer";

export function formatPrice(price: number, currency: string) {
  return currency === "ETB" ? `${Number(price).toLocaleString()} birr` : `$${Number(price).toLocaleString()}`;
}

export async function getCategories() {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("experience_categories").select("*").order("name");
  return data ?? [];
}
export async function getCategoryBySlug(slug: string) {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("experience_categories").select("*").eq("slug", slug).single();
  return data;
}
export async function getExperiencesInCategory(categoryId: number) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("experiences")
    .select("*, experience_photos(*), experience_categories(name, slug)")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });
  return data ?? [];
}
export async function getExperience(id: string) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("experiences")
    .select("*, experience_photos(*), experience_categories(name, slug)")
    .eq("id", id)
    .single();
  return data;
}
export async function getAllExperiences() {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("experiences").select("id, category_id");
  return data ?? [];
}
