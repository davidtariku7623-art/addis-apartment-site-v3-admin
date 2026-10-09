"use client";
export default function UnitForm({ unit, action, submitLabel }: { unit?: any; action: (fd: FormData) => void; submitLabel: string }) {
  return (
    <form action={action} className="admin-form unit-form">
      <label>Room name<input name="name" defaultValue={unit?.name} placeholder="e.g. 1-bedroom, 3rd floor" required /></label>
      <div className="row4">
        <label>Price (USD/mo)<input type="number" name="price_usd" defaultValue={unit?.price_usd} required /></label>
        <label>Bedrooms<input type="number" name="bedrooms" defaultValue={unit?.bedrooms ?? 1} min={0} required /></label>
        <label>Bathrooms<input type="number" name="bathrooms" defaultValue={unit?.bathrooms ?? 1} min={0} required /></label>
        <label>Size (m²)<input type="number" name="size_sqm" defaultValue={unit?.size_sqm} /></label>
      </div>
      <div className="row4">
        <label>Stay type
          <select name="stay_type" defaultValue={unit?.stay_type ?? "Both"}>
            <option>Short stay</option><option>Long stay</option><option>Both</option>
          </select>
        </label>
        <label>Availability
          <select name="availability" defaultValue={unit?.availability ?? "Available"}>
            <option>Available</option><option>Available soon</option><option>Unavailable</option>
          </select>
        </label>
        <label className="check" style={{ alignSelf: "end" }}><input type="checkbox" name="furnished" defaultChecked={unit?.furnished} /> Furnished</label>
      </div>
      <button className="btn">{submitLabel}</button>
    </form>
  );
}
