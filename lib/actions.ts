"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "./supabaseServer";

function str(fd: FormData, k: string) { return String(fd.get(k) ?? "").trim(); }
function num(fd: FormData, k: string) { return Number(fd.get(k) ?? 0); }
function bool(fd: FormData, k: string) { return fd.get(k) === "on"; }

export async function createBuilding(fd: FormData) {
  const supabase = await supabaseServer();
  const amenities = str(fd, "amenities").split(",").map((a) => a.trim()).filter(Boolean);
  const { data, error } = await supabase.from("buildings").insert({
    name: str(fd, "name"), area_id: num(fd, "area_id"), description: str(fd, "description"),
    notes: str(fd, "notes"), amenities, verified: bool(fd, "verified"), featured: bool(fd, "featured"),
  }).select().single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin"); revalidatePath("/");
  redirect(`/admin/buildings/${data.id}`);
}

export async function updateBuilding(id: number, fd: FormData) {
  const supabase = await supabaseServer();
  const amenities = str(fd, "amenities").split(",").map((a) => a.trim()).filter(Boolean);
  const { error } = await supabase.from("buildings").update({
    name: str(fd, "name"), area_id: num(fd, "area_id"), description: str(fd, "description"),
    notes: str(fd, "notes"), amenities, verified: bool(fd, "verified"), featured: bool(fd, "featured"),
  }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin"); revalidatePath("/"); revalidatePath(`/admin/buildings/${id}`);
}

export async function deleteBuilding(id: number) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("buildings").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin"); revalidatePath("/");
  redirect("/admin");
}

export async function addUnit(buildingId: number, fd: FormData) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("units").insert({
    building_id: buildingId, name: str(fd, "name"), price_usd: num(fd, "price_usd"),
    bedrooms: num(fd, "bedrooms"), bathrooms: num(fd, "bathrooms"), size_sqm: num(fd, "size_sqm") || null,
    furnished: bool(fd, "furnished"), stay_type: str(fd, "stay_type"), availability: str(fd, "availability"),
  });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/buildings/${buildingId}`); revalidatePath("/");
}

export async function updateUnit(id: number, buildingId: number, fd: FormData) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("units").update({
    name: str(fd, "name"), price_usd: num(fd, "price_usd"),
    bedrooms: num(fd, "bedrooms"), bathrooms: num(fd, "bathrooms"), size_sqm: num(fd, "size_sqm") || null,
    furnished: bool(fd, "furnished"), stay_type: str(fd, "stay_type"), availability: str(fd, "availability"),
  }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/buildings/${buildingId}`); revalidatePath("/");
}

export async function deleteUnit(id: number, buildingId: number) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("units").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/buildings/${buildingId}`); revalidatePath("/");
}

export async function addPhotoRecord(buildingId: number, path: string, sortOrder: number) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("photos").insert({ building_id: buildingId, path, sort_order: sortOrder });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/buildings/${buildingId}`); revalidatePath("/");
}

export async function deletePhoto(id: number, buildingId: number, path: string) {
  const supabase = await supabaseServer();
  await supabase.storage.from("photos").remove([path]);
  const { error } = await supabase.from("photos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/buildings/${buildingId}`); revalidatePath("/");
}
