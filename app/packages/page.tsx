import Link from "next/link";
import PackageCard from "../../components/PackageCard";
import { getPackages } from "../../lib/packages";

export const metadata = {
  title: "Travel Packages",
  description: "Explore new destinations and plan your next journey with trusted local operators in Ethiopia.",
};

const types = ["Tour", "Hiking", "Cultural", "Other"];

export default async function PackagesPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const all = await getPackages();
  const list = type ? all.filter((p: any) => p.package_type === type) : all;
  return (
    <div className="container section">
      <h1>Travel packages</h1>
      <p className="muted">Tours and hikes with trusted local operators. Message us to book.</p>
      <div className="actions">
        <Link className={!type ? "btn" : "btn ghost"} href="/packages">All</Link>
        {types.map((t) => <Link key={t} className={type === t ? "btn" : "btn ghost"} href={`/packages?type=${t}`}>{t}</Link>)}
      </div>
      {list.length === 0 ? <p className="empty">No packages here yet. Check back soon or message us.</p> : (
        <div className="grid">{list.map((p: any) => <PackageCard key={p.id} p={p} />)}</div>
      )}
    </div>
  );
}
