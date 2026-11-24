"use client";
import type { Area, BuildingRecord, FormAction } from "../lib/types";

export default function BuildingForm({ areas, building, action }: { areas: Area[]; building?: BuildingRecord; action: FormAction }) {
  return (
    <form action={action} className="admin-form">
      <label>Building name<input name="name" defaultValue={building?.name} required /></label>
      <label>Area
        <select name="area_id" defaultValue={building?.area_id} required>
          {areas.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </label>
      <label>Description<textarea name="description" defaultValue={building?.description ?? undefined} rows={3} /></label>
      <label>Amenities (comma separated)<input name="amenities" defaultValue={building?.amenities?.join(", ")} placeholder="Wi-Fi, Parking, Generator" /></label>
      <label>Important notes<textarea name="notes" defaultValue={building?.notes ?? undefined} rows={2} /></label>
      <label className="check"><input type="checkbox" name="verified" defaultChecked={building?.verified} /> Verified listing</label>
      <label className="check"><input type="checkbox" name="featured" defaultChecked={building?.featured} /> Featured</label>
      <button className="btn">{building ? "Save changes" : "Create building"}</button>
    </form>
  );
}
