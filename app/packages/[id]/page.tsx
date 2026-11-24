import Link from "next/link";
import { notFound } from "next/navigation";
import ContactButtons from "../../../components/ContactButtons";
import { getPackage, reservationFee } from "../../../lib/packages";
import { formatPrice } from "../../../lib/experiences";
import { photoUrl } from "../../../lib/queries";
import { whatsappLink, telegramLink } from "../../../lib/config";

export default async function PackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p: any = await getPackage(id);
  if (!p) notFound();
  const photos = (p.package_photos ?? []).sort((a: any, b: any) => a.sort_order - b.sort_order);
  const price = formatPrice(p.price, p.currency);
  const fee = formatPrice(reservationFee(p.price, p.reservation_percent), p.currency);
  const msg = `Hello, I am interested in the package "${p.title}" (${p.package_type}). Price: ${price} per person, reservation fee: ${fee}. Ref: PKG-${p.id}. Is it available?`;
  return (
    <div className="container detail">
      <Link href="/packages">← All packages</Link>
      {photos.length > 0 ? (
        <div className="gallery">
          {photos.slice(0, 3).map((ph: any, i: number) => (
            <img key={ph.id} className={i === 0 ? "photo big" : "photo"} src={photoUrl(ph.path)} alt={p.title} style={{ objectFit: "cover", width: "100%" }} />
          ))}
        </div>
      ) : (
        <div className="gallery"><div className="photo big" style={{ background: "#3a5a6b" }}><span>No photos yet</span></div></div>
      )}
      <h1>{p.title}</h1>
      <p className="muted">{p.package_type}{p.location ? ` · ${p.location}` : ""}</p>
      <p className="price big-price">{price} <small>/ person</small></p>
      <p><b>Reservation fee ({p.reservation_percent}%): {fee}</b><br /><span className="muted">Message us to reserve. You will receive the payment details in the chat.</span></p>
      <ul className="facts">
        {p.duration_days && <li>Duration: {p.duration_days} day(s)</li>}
        {p.dates_info && <li>Dates: {p.dates_info}</li>}
        {p.difficulty && <li>Difficulty: {p.difficulty}</li>}
        {p.max_group && <li>Group size: up to {p.max_group}</li>}
        <li>Availability: {p.availability}</li>
      </ul>
      {p.description && <><h2>About this package</h2><p>{p.description}</p></>}
      {(p.includes ?? []).length > 0 && <><h2>What is included</h2><ul className="tags">{p.includes.map((x: string) => <li key={x}>{x}</li>)}</ul></>}
      {p.cancellation_note && <><h2>Reservation and cancellation</h2><p className="muted">{p.cancellation_note}</p></>}
      {p.availability !== "Paused" && <ContactButtons waHref={whatsappLink(msg)} tgHref={telegramLink()} message={msg} />}
    </div>
  );
}
