export default function PackageForm({ pkg, action }: { pkg?: any; action: (fd: FormData) => void | Promise<void> }) {
  return (
    <form action={action} className="admin-form">
      <label>Title<input name="title" defaultValue={pkg?.title} required /></label>
      <label>Type
        <select name="package_type" defaultValue={pkg?.package_type ?? "Tour"}>
          <option>Tour</option><option>Hiking</option><option>Cultural</option><option>Other</option>
        </select>
      </label>
      <label>Description<textarea name="description" defaultValue={pkg?.description} rows={4} /></label>
      <div className="row4">
        <label>Price per person<input type="number" step="any" name="price" defaultValue={pkg?.price} required /></label>
        <label>Currency
          <select name="currency" defaultValue={pkg?.currency ?? "USD"}><option>USD</option><option>ETB</option></select>
        </label>
        <label>Reservation fee %<input type="number" step="any" name="reservation_percent" defaultValue={pkg?.reservation_percent ?? 10} required /></label>
        <label>Days<input type="number" step="any" name="duration_days" defaultValue={pkg?.duration_days} /></label>
      </div>
      <label>Location<input name="location" defaultValue={pkg?.location} placeholder="Simien Mountains" /></label>
      <label>Dates / departures<input name="dates_info" defaultValue={pkg?.dates_info} placeholder="Every Saturday, or 12-15 March" /></label>
      <div className="row4">
        <label>Difficulty (hiking)<input name="difficulty" defaultValue={pkg?.difficulty} placeholder="Easy / Moderate / Hard" /></label>
        <label>Max group size<input type="number" name="max_group" defaultValue={pkg?.max_group} /></label>
      </div>
      <label>What is included (comma separated)<input name="includes" defaultValue={pkg?.includes?.join(", ")} /></label>
      <label>Reservation fee and cancellation rules (say if the fee is included in the price, and if it is refundable)
        <textarea name="cancellation_note" defaultValue={pkg?.cancellation_note} rows={3} />
      </label>
      <label>Availability
        <select name="availability" defaultValue={pkg?.availability ?? "Available"}>
          <option>Available</option><option>Fully booked</option><option>Paused</option>
        </select>
      </label>
      <label className="check"><input type="checkbox" name="featured" defaultChecked={pkg?.featured} /> Featured</label>
      <button className="btn">{pkg ? "Save changes" : "Create package"}</button>
    </form>
  );
}
