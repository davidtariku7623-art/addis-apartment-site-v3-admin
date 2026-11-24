import Link from "next/link";
import { notFound } from "next/navigation";
import ExperienceCard from "../../../components/ExperienceCard";
import { getCategoryBySlug, getExperiencesInCategory } from "../../../lib/experiences";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const list = await getExperiencesInCategory(category.id);
  return (
    <div className="container section">
      <Link href="/experiences">← All experiences</Link>
      <h1>{category.name}</h1>
      {category.description && <p className="muted">{category.description}</p>}
      {list.length === 0 ? (
        <p className="empty">No experiences here yet. Message us on WhatsApp and we will help you.</p>
      ) : (
        <div className="grid">{list.map((e: any) => <ExperienceCard key={e.id} e={e} />)}</div>
      )}
    </div>
  );
}
