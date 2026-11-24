export default function ExperienceForm({ categories, exp, action }: { categories: any[]; exp?: any; action: (fd: FormData) => void | Promise<void> }) {
  return (
    <form action={action} className="admin-form">
      <label>Title<input name="title" defaultValue={exp?.title} required /></label>
      <label>Category
        <select name="category_id" defaultValue={exp?.category_id} required>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <label>Description<textarea name="description" defaultValue={exp?.description} rows={4} /></label>
      <div className="row4">
        <label>Price per person<input type="number" step="any" name="price" defaultValue={exp?.price} required /></label>
        <label>Currency
          <select name="currency" defaultValue={exp?.currency ?? "USD"}><option>USD</option><option>ETB</option></select>
        </label>
        <label>Hours<input type="number" step="any" name="duration_hours" defaultValue={exp?.duration_hours} /></label>
        <label>Max guests<input type="number" name="max_guests" defaultValue={exp?.max_guests} /></label>
      </div>
      <label>Guide language(s)<input name="guide_language" defaultValue={exp?.guide_language} placeholder="English, Amharic" /></label>
      <label>Area (general area only)<input name="area" defaultValue={exp?.area} placeholder="Bole" /></label>
      <label>What is included (comma separated)<input name="includes" defaultValue={exp?.includes?.join(", ")} placeholder="Coffee tasting, Snacks, Local guide" /></label>
      <label>Meeting point (keep it general)<input name="meeting_point" defaultValue={exp?.meeting_point} /></label>
      <label>Cancellation rule<textarea name="cancellation_note" defaultValue={exp?.cancellation_note} rows={2} /></label>
      <label>Availability
        <select name="availability" defaultValue={exp?.availability ?? "Available"}>
          <option>Available</option><option>Fully booked</option><option>Paused</option>
        </select>
      </label>
      <label className="check"><input type="checkbox" name="featured" defaultChecked={exp?.featured} /> Featured</label>
      <button className="btn">{exp ? "Save changes" : "Create experience"}</button>
    </form>
  );
}
