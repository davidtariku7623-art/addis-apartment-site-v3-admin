import Link from "next/link";
import { photoUrl } from "../lib/queries";
import { formatPrice } from "../lib/experiences";

export default function ExperienceCard({ e }: { e: any }) {
  const photos = (e.experience_photos ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);
  const cover = photos[0];
  const details = [e.duration_hours ? `${e.duration_hours} hours` : "", e.max_guests ? `up to ${e.max_guests} guests` : ""].filter(Boolean).join(" · ");
  return (
    <article className="card">
      {cover ? (
        <img className="photo" src={photoUrl(cover.path)} alt={e.title} style={{ objectFit: "cover", width: "100%" }} />
      ) : (
        <div className="photo" style={{ background: "#8a6b4a" }}><span>No photo yet</span></div>
      )}
      <div className="card-body">
        <p className="muted">{e.experience_categories?.name}{e.area ? ` · ${e.area}` : ""}</p>
        <h3>{e.title}</h3>
        <p className="price">{formatPrice(e.price, e.currency)} <small>/ person</small></p>
        {details && <p className="muted">{details}</p>}
        <p className={e.availability === "Available" ? "avail yes" : "avail"}>{e.availability}</p>
        <Link className="btn" href={`/experiences/item/${e.id}`}>View details</Link>
      </div>
    </article>
  );
}
