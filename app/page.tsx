import Link from "next/link";
import { siteConfig } from "../lib/config";
import { getAreas, getAllBuildings } from "../lib/queries";

const faqs = [
  ["Do you own the apartments?", "No. We work directly with apartment owners and connect you with them."],
  ["Does it cost me anything to ask?", "Asking questions is free. Our commission is agreed with the owner."],
  ["What does Verified mean?", "Our team checked key details of the listing with the owner. It is not a guarantee about the property."],
  ["Can I book online?", "Not yet. Message us on WhatsApp or Telegram and we will arrange everything."],
];

export default async function Home() {
  const areas = await getAreas();
  const buildings = await getAllBuildings();
  const countFor = (id: number) => buildings.filter((b: any) => b.area_id === id).length;
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{siteConfig.tagline}</h1>
          <p>Apartments for visitors, diplomats, NGO staff, business travelers and people moving to the city. Pick an area, choose a building, then message us.</p>
          <a className="btn" href="#areas">Choose an area</a>
        </div>
      </section>
      <section className="container section" id="areas">
        <h2>Choose an area in Addis Ababa</h2>
        <div className="areas">
          {areas.map((a: any) => (
            <Link key={a.id} className="area-tile" href={`/areas/${a.slug}`}>
              <b>{a.name}</b><span className="muted">{countFor(a.id)} building{countFor(a.id) === 1 ? "" : "s"}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="alt" id="how"><div className="container section">
        <h2>How it works</h2>
        <ol className="steps">
          <li><b>Choose an area.</b> Then pick a building and see its rooms and photos.</li>
          <li><b>Message us.</b> Use the WhatsApp or Telegram button on any apartment.</li>
          <li><b>We connect you.</b> We put you in touch with the owner and help until you decide.</li>
        </ol>
      </div></section>
      <section className="container section" id="verified">
        <h2>What a Verified listing means</h2>
        <p>A Verified label means our team checked the key details of the apartment with its owner, such as the owner&apos;s permission to advertise, the price and the availability. It helps you trust what you see. It is not a guarantee that a property is perfect or risk-free, so we still recommend visiting before you pay.</p>
      </section>
      <section className="alt" id="faq"><div className="container section">
        <h2>Frequently asked questions</h2>
        {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div></section>
    </>
  );
}
