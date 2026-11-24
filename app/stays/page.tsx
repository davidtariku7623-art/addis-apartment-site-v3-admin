import Link from "next/link";
import { getAreas, getAllBuildings } from "../../lib/queries";

export const metadata = {
  title: "Stays",
  description: "Find your place to feel at home. Choose an area in Addis Ababa to see apartments and rooms.",
};

export default async function StaysPage() {
  const areas = await getAreas();
  const buildings = await getAllBuildings();
  const countFor = (id: number) => buildings.filter((b: any) => b.area_id === id).length;
  return (
    <div className="container section">
      <h1>Stays</h1>
      <p className="muted">Find your place to feel at home. Choose an area in Addis Ababa to see buildings and rooms.</p>
      <div className="areas">
        {areas.map((a: any) => (
          <Link key={a.id} className="area-tile" href={`/areas/${a.slug}`}>
            <b>{a.name}</b>
            <span className="muted">{countFor(a.id)} building{countFor(a.id) === 1 ? "" : "s"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
