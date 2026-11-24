import Link from "next/link";
import { getCategories, getAllExperiences } from "../../lib/experiences";

export const metadata = {
  title: "Experiences",
  description: "Discover the people, culture and adventures of Ethiopia with local guides.",
};

export default async function ExperiencesPage() {
  const categories = await getCategories();
  const all = await getAllExperiences();
  const count = (id: number) => all.filter((x: any) => x.category_id === id).length;
  return (
    <div className="container section">
      <h1>Experiences in Ethiopia</h1>
      <p className="muted">Learn a traditional skill with a local guide. Choose a category.</p>
      <div className="areas">
        {categories.map((c: any) => (
          <Link key={c.id} className="area-tile" href={`/experiences/${c.slug}`}>
            <b>{c.name}</b>
            <span className="muted">{count(c.id)} experience{count(c.id) === 1 ? "" : "s"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
