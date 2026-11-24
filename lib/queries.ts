import { supabaseServer } from "./supabaseServer";
import { demoAreas, demoBuildings } from "./demoData";
import type { Area, BuildingRecord } from "./types";
export { photoUrl } from "./photoUrl";

const demoMode = process.env.DEMO_MODE !== "false";

export async function getAreas() {
  if (demoMode) return demoAreas;
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("areas").select("*").order("name");
  if (error) throw new Error(`Unable to load areas: ${error.message}`);
  return (data ?? []) as Area[];
}
export async function getAreaBySlug(slug: string) {
  if (demoMode) return demoAreas.find((area) => area.slug === slug) ?? null;
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("areas").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`Unable to load area: ${error.message}`);
  return data as Area | null;
}
export async function getBuildingsInArea(areaId: number) {
  if (demoMode) return demoBuildings.filter((building) => building.area_id === areaId);
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("buildings")
    .select("*, units(*), photos(*), areas(name, slug)")
    .eq("area_id", areaId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Unable to load buildings: ${error.message}`);
  return (data ?? []) as BuildingRecord[];
}
export async function getBuilding(id: string) {
  if (demoMode) return demoBuildings.find((building) => String(building.id) === id) ?? null;
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("buildings")
    .select("*, units(*), photos(*), areas(name, slug)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Unable to load building: ${error.message}`);
  return data as BuildingRecord | null;
}
export async function getAllBuildings() {
  if (demoMode) return demoBuildings;
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("buildings")
    .select("*, units(*), photos(*), areas(name, slug)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Unable to load buildings: ${error.message}`);
  return (data ?? []) as BuildingRecord[];
}
