import Link from "next/link";
import { notFound } from "next/navigation";
import ContactButtons from "../../../../components/ContactButtons";
import { getExperience, formatPrice } from "../../../../lib/experiences";
import { photoUrl } from "../../../../lib/queries";
import { whatsappLink, telegramLink } from "../../../../lib/config";

export default async function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e: any = await getExperience(id);
  if (!e) notFound();
  const photos = (e.experience_photos ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);
  const price = formatPrice(e.price, e.currency);
  const msg = `Hello, I am interested in the experience "${e.title}" (${e.experience_categories?.name}). Price: ${price} per person. Ref: EXP-${e.id}. Is it available?`;
  return (
    <div className="container detail">
      <Link href={`/experiences/${e.experience_categories?.slug}`}>← Back to {e.experience_categories?.name}</Link>
      {photos.length > 0 ? (
        <div className="gallery">
          {photos.slice(0, 3).map((p: any, i: number) => (
            <img key={p.id} className={i === 0 ? "photo big" : "photo"} src={photoUrl(p.path)} alt={e.title} style={{ objectFit: "cover", width: "100%" }} />
          ))}
        </div>
      ) : (
        <div className="gallery"><div className="photo big" style={{ background: "#8a6b4a" }}><span>No photos yet</span></div></div>
      )}
      <h1>{e.title}</h1>
      <p className="muted">{e.experience_categories?.name}{e.area ? ` · ${e.area}, Addis Ababa` : ""}</p>
      <p className="price big-price">{price} <small>/ person</small></p>
      <ul className="facts">
        {e.duration_hours && <li>Duration: {e.duration_hours} hours</li>}
        {e.max_guests && <li>Group size: up to {e.max_guests}</li>}
        {e.guide_language && <li>Guide speaks: {e.guide_language}</li>}
        <li>Availability: {e.availability}</li>
      </ul>
      {e.description && <><h2>About this experience</h2><p>{e.description}</p></>}
      {(e.includes ?? []).length > 0 && <><h2>What is included</h2><ul className="tags">{e.includes.map((x: string) => <li key={x}>{x}</li>)}</ul></>}
      {e.meeting_point && <><h2>Meeting point</h2><p>{e.meeting_point}</p></>}
      {e.cancellation_note && <><h2>Cancellation</h2><p className="muted">{e.cancellation_note}</p></>}
      {e.availability !== "Paused" && <ContactButtons waHref={whatsappLink(msg)} tgHref={telegramLink()} message={msg} />}
    </div>
  );
}
