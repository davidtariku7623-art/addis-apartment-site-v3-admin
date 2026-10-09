import Link from "next/link";
import { notFound } from "next/navigation";
import { getBuilding, photoUrl } from "../../../lib/queries";
import { whatsappLink, telegramLink } from "../../../lib/config";

export default async function BuildingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b: any = await getBuilding(id);
  if (!b) notFound();
  const photos = (b.photos ?? []).sort((x: any, y: any) => x.sort_order - y.sort_order);
  return (
    <div className="container detail">
      <Link href={`/areas/${b.areas?.slug}`}>← Back to {b.areas?.name}</Link>
      {photos.length > 0 ? (
        <div className="gallery">
          {photos.slice(0, 3).map((p: any, i: number) => (
            <img key={p.id} className={i === 0 ? "photo big" : "photo"} src={photoUrl(p.path)} alt={b.name} />
          ))}
        </div>
      ) : (
        <div className="gallery"><div className="photo big" style={{ background: "#888" }}><span>No photos yet</span></div></div>
      )}
      <h1>{b.name}</h1>
      <p className="muted">{b.areas?.name}, Addis Ababa · {b.verified ? "Verified listing" : "Not yet verified"}</p>
      <p>{b.description}</p>
      <ul className="tags">{(b.amenities ?? []).map((a: string) => <li key={a}>{a}</li>)}</ul>
      <p className="muted">{b.notes}</p>
      <h2>Rooms in this building</h2>
      {(b.units ?? []).map((x: any) => (
        <div className="unit" key={x.id}>
          <div>
            <h3>{x.name}</h3>
            <p className="muted">{x.bedrooms === 0 ? "Studio" : `${x.bedrooms} bed`} · {x.bathrooms} bath{x.size_sqm ? ` · ${x.size_sqm} m²` : ""} · {x.furnished ? "Furnished" : "Unfurnished"} · {x.stay_type}</p>
            <p className={x.availability === "Available" ? "avail yes" : "avail"}>{x.availability}</p>
          </div>
          <div>
            <p className="price">${x.price_usd} <small>/ month</small></p>
            {x.availability !== "Unavailable" && (
              <a className="btn wa" target="_blank" rel="noopener noreferrer"
                href={whatsappLink(`Hello, I am interested in the ${x.name} at ${b.name} (${b.areas?.name}), $${x.price_usd}/month. Is it still available?`)}>Ask on WhatsApp</a>
            )}
          </div>
        </div>
      ))}
      <div className="actions"><a className="btn tg" href={telegramLink()} target="_blank" rel="noopener noreferrer">Ask on Telegram</a></div>
    </div>
  );
}
