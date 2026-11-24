import Link from "next/link";
import { photoUrl } from "../lib/photoUrl";
import type { Building } from "../lib/data";
import type { BuildingRecord } from "../lib/types";

export default function BuildingCard({ b }: { b: BuildingRecord | Building }) {
  const isDatabaseBuilding = "areas" in b;
  const units = b.units.map((unit) => "price_usd" in unit
    ? { price: unit.price_usd, availability: unit.availability }
    : { price: unit.priceUsd, availability: unit.availability });
  const open = units.filter((x) => x.availability === "Available").length;
  const from = units.length ? Math.min(...units.map((x) => Number(x.price))) : null;
  const areaName = isDatabaseBuilding ? b.areas?.name : b.area;
  const cover = isDatabaseBuilding ? b.photos[0] : undefined;
  return (
    <article className="card">
      {cover ? (
        <img className="photo" src={photoUrl(cover.path)} alt={b.name} style={{ objectFit: "cover", width: "100%" }} />
      ) : (
        <div className="photo" style={{ background: "#888" }}><span>No photo yet</span></div>
      )}
      {b.verified && <b className="badge">Verified</b>}
      <div className="card-body">
        <p className="muted">{areaName}</p>
        <h3>{b.name}</h3>
        <p className="price">{from !== null ? <><small>From </small>${from} <small>/ month</small></> : "Price on request"}</p>
        <p className="muted">{units.length} room{units.length === 1 ? "" : "s"} listed</p>
        <p className={open ? "avail yes" : "avail"}>{open ? `${open} available now` : "None available now"}</p>
        <Link className="btn" href={`/apartments/${b.id}`}>View rooms</Link>
      </div>
    </article>
  );
}
