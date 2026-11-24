import { supabaseServer } from "./supabaseServer";

export function reservationFee(price: number, percent: number) {
  return Number(((Number(price) * Number(percent)) / 100).toFixed(2));
}
export async function getPackages() {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("packages").select("*, package_photos(*)").order("created_at", { ascending: false });
  return data ?? [];
}
export async function getPackage(id: string) {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("packages").select("*, package_photos(*)").eq("id", id).single();
  return data;
}
