import Link from "next/link";
import { getAllBuildings } from "../../lib/queries";

export default async function AdminHome() {
  const buildings = await getAllBuildings();
  return (
    <div>
      <h1>Your buildings</h1>
      <p className="muted">{buildings.length} building{buildings.length === 1 ? "" : "s"} total.</p>
      {buildings.length === 0 && <p className="empty">No buildings yet. Click "+ Add building" above to create your first one.</p>}
      {buildings.map((b: any) => (
        <div className="unit" key={b.id}>
          <div>
            <h3>{b.name}</h3>
            <p className="muted">{b.areas?.name} · {b.units?.length ?? 0} room(s) · {b.verified ? "Verified" : "Not verified"} · {b.photos?.length ?? 0} photo(s)</p>
          </div>
          <div><Link className="btn" href={`/admin/buildings/${b.id}`}>Manage</Link></div>
        </div>
      ))}
    </div>
  );
}
