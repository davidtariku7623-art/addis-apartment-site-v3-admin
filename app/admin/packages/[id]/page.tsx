import { notFound } from "next/navigation";
import { supabaseServer } from "../../../../lib/supabaseServer";
import { photoUrl } from "../../../../lib/queries";
import { updatePackage, deletePackage, addPackagePhoto, deletePackagePhoto } from "../../../../lib/moreActions";
import PackageForm from "../../../../components/PackageForm";
import GenericPhotoUploader from "../../../../components/GenericPhotoUploader";

export default async function EditPackage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkgId = Number(id);
  const supabase = await supabaseServer();
  const { data: p } = await supabase.from("packages").select("*, package_photos(*)").eq("id", pkgId).single();
  if (!p) notFound();
  const photos = (p.package_photos ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);
  return (
    <div style={{ maxWidth: 640 }}>
      <h1>{p.title}</h1>
      <h2>Photos</h2>
      <div className="photo-grid">
        {photos.map((ph: any) => (
          <div key={ph.id} className="photo-thumb">
            <img src={photoUrl(ph.path)} alt="" />
            <form action={deletePackagePhoto.bind(null, ph.id, pkgId, ph.path)}>
              <button className="btn ghost small-btn">Remove</button>
            </form>
          </div>
        ))}
      </div>
      <GenericPhotoUploader folder={`package-${pkgId}`} onUploaded={addPackagePhoto.bind(null, pkgId, photos.length)} />
      <h2>Details</h2>
      <PackageForm pkg={p} action={updatePackage.bind(null, pkgId)} />
      <h2 style={{ color: "#b23b3b" }}>Danger zone</h2>
      <form action={deletePackage.bind(null, pkgId)}>
        <button className="btn" style={{ background: "#b23b3b" }}>Delete this package</button>
      </form>
    </div>
  );
}
