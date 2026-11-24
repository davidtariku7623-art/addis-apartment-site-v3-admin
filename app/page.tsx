import Link from "next/link";
import { siteConfig } from "../lib/config";

const faqs = [
  ["What is LUCY DISCOVERY?", "LUCY DISCOVERY is an Ethiopian-born platform connecting people with accommodation, travel opportunities and memorable experiences."],
  ["What services do you offer?", "We offer apartment accommodation listings, experiences and activities, and travel packages."],
  ["Can I book directly through the website?", "Currently, customers can contact us through WhatsApp or Telegram to make inquiries and arrange the next steps."],
  ["Are the apartments verified?", "We check key listing details with apartment owners. Verification does not guarantee that a property is risk-free."],
  ["Can international visitors use LUCY DISCOVERY?", "Yes. We aim to help both local and international visitors discover accommodation, travel opportunities and experiences in Ethiopia."],
  ["Do you organize all the experiences and travel packages yourselves?", "We work with relevant service providers and partners to connect customers with available opportunities. The exact arrangement depends on the service."],
  ["How can I contact LUCY DISCOVERY?", "You can contact us through the WhatsApp and Telegram links available on our website."],
];

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="hero main-hero">
        <div className="container">
          <p className="eyebrow">{siteConfig.brandName}</p>
          <h1>Discover stays, journeys and experiences across Ethiopia.</h1>
          <p className="lead">From a place to feel at home to unforgettable adventures, we help you discover more, starting in Addis Ababa.</p>
          <a className="btn gold" href="#explore">Start Exploring</a>
          <p className="tagline">{siteConfig.tagline}</p>
        </div>
      </section>

      {/* 2. THE THREE SERVICES */}
      <section className="container section" id="explore">
        <div className="cats">
          <Link className="cat cat-stays" href="/stays">
            <span className="cat-text"><b>Stays</b><small>Find your place to feel at home.</small></span>
          </Link>
          <Link className="cat cat-exp" href="/experiences">
            <span className="cat-text"><b>Experiences</b><small>Discover the people, culture and adventures of Ethiopia.</small></span>
          </Link>
          <Link className="cat cat-pkg" href="/packages">
            <span className="cat-text"><b>Travel Packages</b><small>Explore new destinations and plan your next journey.</small></span>
          </Link>
        </div>
      </section>

      {/* 3. WHY LUCY? */}
      <section className="story" id="about">
        <div className="container">
          <p className="eyebrow">Why Lucy?</p>
          <h2>A story born in Ethiopia. A world waiting to be discovered.</h2>
          <div className="gold-rule" />
          <p>Our name is inspired by Lucy, the ancient hominin fossil discovered in Hadar, Ethiopia, in 1974. About 3.2 million years old, she is one of the most famous discoveries in the story of humankind, and a reminder of how deep Ethiopia’s history runs.</p>
          <p>Inspired by that legacy, {siteConfig.brandName} celebrates curiosity, exploration and the joy of discovering something new.</p>
          <p>From finding the right place to stay, to exploring new destinations, to experiencing different cultures, we bring discovery closer to everyone.</p>
          <p className="closing">Ethiopian roots. Global vision.</p>
        </div>
      </section>

      {/* 4. DISCOVER ETHIOPIA */}
      <section className="discover" id="discover">
        <div className="container">
          <p className="eyebrow">Discover Ethiopia</p>
          <h2>One country. Many stories to explore.</h2>
          <div className="gold-rule" />
          <p>Ethiopia is a country of ancient history, living traditions and varied landscapes, where its people and culture offer something new at every turn.</p>
          <p>We created {siteConfig.brandName} to make it easier to find a place to stay, meet the culture and plan the journey, starting in Addis Ababa.</p>
          <div className="actions center">
            <Link className="btn ghost" href="/stays">Stays</Link>
            <Link className="btn ghost" href="/experiences">Experiences</Link>
            <Link className="btn ghost" href="/packages">Travel Packages</Link>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="alt" id="how"><div className="container section">
        <h2>How it works</h2>
        <ol className="steps">
          <li><b>Explore.</b> Choose Stays, Experiences or Travel Packages and browse what is available.</li>
          <li><b>Message us.</b> Use the WhatsApp or Telegram button on any listing.</li>
          <li><b>We guide the next steps.</b> We handle the contact with the owner or service provider and help arrange the details, depending on the service.</li>
        </ol>
      </div></section>

      {/* 6. FAQ */}
      <section className="container section" id="faq">
        <h2>Frequently asked questions</h2>
        {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </section>
    </>
  );
}
