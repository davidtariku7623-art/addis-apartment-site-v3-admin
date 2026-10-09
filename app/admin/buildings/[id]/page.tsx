import { notFound } from "next/navigation";
import { supabaseServer } from "../../../../lib/supabaseServer";
import { getBuilding, photoUrl } from "../../../../lib/queries";
import { updateBuilding, deleteBuilding, addUnit, updateUnit, deleteUnit, deletePhoto } from "../../../../lib/actions";
import BuildingForm from "../../../../components/BuildingForm";
import UnitForm from "../../../../components/UnitForm";
import PhotoUploader from "../../../../components/PhotoUploader";

export default async function EditBuildingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const buildingId = Number(id);
  const b: any = await getBuilding(id);
  if (!b) notFound();
  const supabase = await supabaseServer();
  const { data: areas } = await supabase.from("areas").select("*").order("name");
  const photos = (b.photos ?? []).sort((x: any, y: any) => x.sort_order - y.sort_order);

  const saveBuilding = updateBuilding.bind(null, buildingId);
  const removeBuilding = deleteBuilding.bind(null, buildingId);
  const createUnit = addUnit.bind(null, buildingId);

  return (
    <div style={{ maxWidth: 640 }}>
      <h1>{b.name}</h1>

      <h2>Photos</h2>
      <div className="photo-grid">
        {photos.map((p: any) => (
          <div key={p.id} className="photo-thumb">
            <img src={photoUrl(p.path)} alt="" />
            <form action={deletePhoto.bind(null, p.id, buildingId, p.path)}>
              <button className="btn ghost small-btn">Remove</button>
            </form>
          </div>
        ))}
      </div>
      <PhotoUploader buildingId={buildingId} nextOrder={photos.length} />

      <h2>Building details</h2>
      <BuildingForm areas={areas ?? []} building={b} action={saveBuilding} />

      <h2>Rooms</h2>
      {(b.units ?? []).map((u: any) => (
        <details key={u.id} className="unit-details">
          <summary>{u.name} — ${u.price_usd}/mo — {u.availability}</summary>
          <UnitForm unit={u} submitLabel="Save room" action={updateUnit.bind(null, u.id, buildingId)} />
          <form action={deleteUnit.bind(null, u.id, buildingId)}>
            <button className="btn ghost small-btn">Delete this room</button>
          </form>
        </details>
      ))}

      <h3>Add a new room</h3>
      <UnitForm submitLabel="Add room" action={createUnit} />

      <h2 style={{ color: "#b23b3b" }}>Danger zone</h2>
      <form action={removeBuilding}>
        <button className="btn" style={{ background: "#b23b3b" }}>Delete this whole building</button>
      </form>
    </div>
  );
}
