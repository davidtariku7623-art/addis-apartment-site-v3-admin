"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "./supabaseServer";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => Number(fd.get(k) ?? 0);
const numOrNull = (fd: FormData, k: string) => { const v = str(fd, k); return v === "" ? null : Number(v); };
const list = (fd: FormData, k: string) => str(fd, k).split(",").map((s) => s.trim()).filter(Boolean);
const bool = (fd: FormData, k: string) => fd.get(k) === "on";

const expFields = (fd: FormData) => ({
  category_id: num(fd, "category_id"), title: str(fd, "title"), description: str(fd, "description"),
  price: num(fd, "price"), currency: str(fd, "currency"), duration_hours: numOrNull(fd, "duration_hours"),
  max_guests: numOrNull(fd, "max_guests"), guide_language: str(fd, "guide_language"), area: str(fd, "area"),
  includes: list(fd, "includes"), meeting_point: str(fd, "meeting_point"),
  cancellation_note: str(fd, "cancellation_note"), availability: str(fd, "availability"), featured: bool(fd, "featured"),
});
const pkgFields = (fd: FormData) => ({
  title: str(fd, "title"), package_type: str(fd, "package_type"), description: str(fd, "description"),
  price: num(fd, "price"), currency: str(fd, "currency"), reservation_percent: num(fd, "reservation_percent"),
  duration_days: numOrNull(fd, "duration_days"), location: str(fd, "location"), dates_info: str(fd, "dates_info"),
  difficulty: str(fd, "difficulty"), max_group: numOrNull(fd, "max_group"), includes: list(fd, "includes"),
  cancellation_note: str(fd, "cancellation_note"), availability: str(fd, "availability"), featured: bool(fd, "featured"),
});

function refresh() { revalidatePath("/experiences", "layout"); revalidatePath("/packages", "layout"); revalidatePath("/admin", "layout"); }

export async function createExperience(fd: FormData) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("experiences").insert(expFields(fd)).select().single();
  if (error) throw new Error(error.message);
  refresh(); redirect(`/admin/experiences/${data.id}`);
}
export async function updateExperience(id: number, fd: FormData) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("experiences").update(expFields(fd)).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
export async function deleteExperience(id: number) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh(); redirect("/admin/experiences");
}
export async function addExperiencePhoto(expId: number, order: number, path: string) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("experience_photos").insert({ experience_id: expId, path, sort_order: order });
  if (error) throw new Error(error.message);
  refresh();
}
export async function deleteExperiencePhoto(photoId: number, expId: number, path: string) {
  const supabase = await supabaseServer();
  await supabase.storage.from("photos").remove([path]);
  const { error } = await supabase.from("experience_photos").delete().eq("id", photoId);
  if (error) throw new Error(error.message);
  refresh();
}

export async function createPackage(fd: FormData) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("packages").insert(pkgFields(fd)).select().single();
  if (error) throw new Error(error.message);
  refresh(); redirect(`/admin/packages/${data.id}`);
}
export async function updatePackage(id: number, fd: FormData) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("packages").update(pkgFields(fd)).eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}
export async function deletePackage(id: number) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh(); redirect("/admin/packages");
}
export async function addPackagePhoto(pkgId: number, order: number, path: string) {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("package_photos").insert({ package_id: pkgId, path, sort_order: order });
  if (error) throw new Error(error.message);
  refresh();
}
export async function deletePackagePhoto(photoId: number, pkgId: number, path: string) {
  const supabase = await supabaseServer();
  await supabase.storage.from("photos").remove([path]);
  const { error } = await supabase.from("package_photos").delete().eq("id", photoId);
  if (error) throw new Error(error.message);
  refresh();
}
