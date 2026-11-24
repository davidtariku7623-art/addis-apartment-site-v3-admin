import Link from "next/link";
import { supabaseServer } from "../../../lib/supabaseServer";

export default async function AdminPackages() {
  const supabase = await supabaseServer();
  const { data } = await supabase.from("packages").select("*, package_photos(id)").order("created_at", { ascending: false });
  const list = data ?? [];
  return (
    <div>
      <h1>Your travel packages</h1>
      <p className="muted">{list.length} total.</p>
      <Link className="btn" href="/admin/packages/new">+ Add package</Link>
      <div style={{ marginTop: 16 }}>
        {list.length === 0 && <p className="empty">No packages yet. Click "+ Add package".</p>}
        {list.map((p: any) => (
          <div className="unit" key={p.id}>
            <div>
              <h3>{p.title}</h3>
              <p className="muted">{p.package_type} · {p.availability} · {p.package_photos?.length ?? 0} photo(s)</p>
            </div>
            <div><Link className="btn" href={`/admin/packages/${p.id}`}>Manage</Link></div>
          </div>
        ))}
      </div>
    </div>
  );
}
