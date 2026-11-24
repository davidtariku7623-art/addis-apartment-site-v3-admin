import Link from "next/link";
import { photoUrl } from "../lib/queries";
import { formatPrice } from "../lib/experiences";

export default function PackageCard({ p }: { p: any }) {
  const photos = (p.package_photos ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);
  const cover = photos[0];
  return (
    <article className="card">
      {cover ? (
        <img className="photo" src={photoUrl(cover.path)} alt={p.title} style={{ objectFit: "cover", width: "100%" }} />
      ) : (
        <div className="photo" style={{ background: "#3a5a6b" }}><span>No photo yet</span></div>
      )}
      <div className="card-body">
        <p className="muted">{p.package_type}{p.location ? ` · ${p.location}` : ""}</p>
        <h3>{p.title}</h3>
        <p className="price">{formatPrice(p.price, p.currency)} <small>/ person</small></p>
        <p className="muted">{p.duration_days ? `${p.duration_days} day${Number(p.duration_days) === 1 ? "" : "s"}` : ""}{p.dates_info ? ` · ${p.dates_info}` : ""}</p>
        <p className={p.availability === "Available" ? "avail yes" : "avail"}>{p.availability}</p>
        <Link className="btn" href={`/packages/${p.id}`}>View package</Link>
      </div>
    </article>
  );
}
