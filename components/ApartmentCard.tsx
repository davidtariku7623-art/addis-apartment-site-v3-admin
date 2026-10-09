import Link from "next/link";
import { photoUrl } from "../lib/queries";

export default function BuildingCard({ b }: { b: any }) {
  const units = b.units ?? [];
  const open = units.filter((x: any) => x.availability === "Available").length;
  const from = units.length ? Math.min(...units.map((x: any) => Number(x.price_usd))) : null;
  const cover = (b.photos ?? [])[0];
  return (
    <article className="card">
      {cover ? (
        <img className="photo" src={photoUrl(cover.path)} alt={b.name} style={{ objectFit: "cover", width: "100%" }} />
      ) : (
        <div className="photo" style={{ background: "#888" }}><span>No photo yet</span></div>
      )}
      {b.verified && <b className="badge">Verified</b>}
      <div className="card-body">
        <p className="muted">{b.areas?.name}</p>
        <h3>{b.name}</h3>
        <p className="price">{from !== null ? <><small>From </small>${from} <small>/ month</small></> : "Price on request"}</p>
        <p className="muted">{units.length} room{units.length === 1 ? "" : "s"} listed</p>
        <p className={open ? "avail yes" : "avail"}>{open ? `${open} available now` : "None available now"}</p>
        <Link className="btn" href={`/apartments/${b.id}`}>View rooms</Link>
      </div>
    </article>
  );
}
