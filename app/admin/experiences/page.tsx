import Link from "next/link";
import { supabaseServer } from "../../../lib/supabaseServer";

export default async function AdminExperiences() {
  const supabase = await supabaseServer();
  const { data } = await supabase
    .from("experiences")
    .select("*, experience_categories(name), experience_photos(id)")
    .order("created_at", { ascending: false });
  const list = data ?? [];
  return (
    <div>
      <h1>Your experiences</h1>
      <p className="muted">{list.length} total.</p>
      <Link className="btn" href="/admin/experiences/new">+ Add experience</Link>
      <div style={{ marginTop: 16 }}>
        {list.length === 0 && <p className="empty">No experiences yet. Click "+ Add experience".</p>}
        {list.map((e: any) => (
          <div className="unit" key={e.id}>
            <div>
              <h3>{e.title}</h3>
              <p className="muted">{e.experience_categories?.name} · {e.availability} · {e.experience_photos?.length ?? 0} photo(s)</p>
            </div>
            <div><Link className="btn" href={`/admin/experiences/${e.id}`}>Manage</Link></div>
          </div>
        ))}
      </div>
    </div>
  );
}
