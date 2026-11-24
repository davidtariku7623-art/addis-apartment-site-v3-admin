import { notFound } from "next/navigation";
import { supabaseServer } from "../../../../lib/supabaseServer";
import { photoUrl } from "../../../../lib/queries";
import { updateExperience, deleteExperience, addExperiencePhoto, deleteExperiencePhoto } from "../../../../lib/moreActions";
import ExperienceForm from "../../../../components/ExperienceForm";
import GenericPhotoUploader from "../../../../components/GenericPhotoUploader";

export default async function EditExperience({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expId = Number(id);
  const supabase = await supabaseServer();
  const { data: e } = await supabase.from("experiences").select("*, experience_photos(*)").eq("id", expId).single();
  if (!e) notFound();
  const { data: categories } = await supabase.from("experience_categories").select("*").order("name");
  const photos = (e.experience_photos ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);
  return (
    <div style={{ maxWidth: 640 }}>
      <h1>{e.title}</h1>
      <h2>Photos</h2>
      <div className="photo-grid">
        {photos.map((p: any) => (
          <div key={p.id} className="photo-thumb">
            <img src={photoUrl(p.path)} alt="" />
            <form action={deleteExperiencePhoto.bind(null, p.id, expId, p.path)}>
              <button className="btn ghost small-btn">Remove</button>
            </form>
          </div>
        ))}
      </div>
      <GenericPhotoUploader folder={`experience-${expId}`} onUploaded={addExperiencePhoto.bind(null, expId, photos.length)} />
      <h2>Details</h2>
      <ExperienceForm categories={categories ?? []} exp={e} action={updateExperience.bind(null, expId)} />
      <h2 style={{ color: "#b23b3b" }}>Danger zone</h2>
      <form action={deleteExperience.bind(null, expId)}>
        <button className="btn" style={{ background: "#b23b3b" }}>Delete this experience</button>
      </form>
    </div>
  );
}
