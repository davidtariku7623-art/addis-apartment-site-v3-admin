import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./theme.css";
import { siteConfig, whatsappLink, telegramLink } from "../lib/config";

// The site address used for social previews. Until you buy your own domain this uses your Vercel address.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
const description = "Discover stays, travel packages and unforgettable experiences in Ethiopia.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteConfig.brandName, template: `%s | ${siteConfig.brandName}` },
  description,
  openGraph: {
    type: "website",
    siteName: siteConfig.brandName,
    title: siteConfig.brandName,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.brandName }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.brandName, description, images: ["/og-image.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container bar">
            <Link href="/" className="brand">
              <img src="/logo-mark.svg" alt="" width={34} height={34} />
              <span>{siteConfig.brandName}</span>
            </Link>
            <nav>
              <Link href="/stays">Stays</Link>
              <Link href="/experiences">Experiences</Link>
              <Link href="/packages">Travel</Link>
              <Link href="/#about">About</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer" id="contact">
          <div className="container">
            <h2>Talk to us</h2>
            <p>Tell us what you are looking for and we will handle the rest, including viewings and all communication with the owner.</p>
            <div className="actions">
              <a className="btn wa" href={whatsappLink("Hello, I would like to know more about your stays, experiences and packages.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a className="btn tg" href={telegramLink()} target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
            <p className="muted small">Social media: Facebook · Instagram · LinkedIn (links coming soon)</p>
            <p className="muted small">© 2026 {siteConfig.brandName}. All listings shown are fictional samples for development.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
