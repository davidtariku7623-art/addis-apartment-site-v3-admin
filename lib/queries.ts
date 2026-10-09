import { supabaseServer } from "./supabaseServer";

export async function getAreas() {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("areas").select("*").order("name");
  return data ?? [];
}
export async function getAreaBySlug(slug: string) {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("areas").select("*").eq("slug", slug).single();
  return data;
}
export async function getBuildingsInArea(areaId: number) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("buildings")
    .select("*, units(*), photos(*), areas(name, slug)")
    .eq("area_id", areaId)
    .order("created_at", { ascending: false });
  return data ?? [];
}
export async function getBuilding(id: string) {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("buildings")
    .select("*, units(*), photos(*), areas(name, slug)")
    .eq("id", id)
    .single();
  return data;
}
export async function getAllBuildings() {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("buildings")
    .select("*, units(*), photos(*), areas(name, slug)")
    .order("created_at", { ascending: false });
  return data ?? [];
}
export function photoUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/${path}`;
}
