import Link from "next/link";
import { notFound } from "next/navigation";
import BuildingCard from "../../../components/ApartmentCard";
import { getAreaBySlug, getBuildingsInArea } from "../../../lib/queries";

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) notFound();
  const list = await getBuildingsInArea(area.id);
  return (
    <div className="container section">
      <Link href="/#areas">← Choose another area</Link>
      <h1>Apartments in {area.name}</h1>
      {list.length === 0 ? (
        <p className="empty">No apartments listed here yet. Message us on WhatsApp and we will look for you.</p>
      ) : <div className="grid">{list.map((b: any) => <BuildingCard key={b.id} b={b} />)}</div>}
    </div>
  );
}
