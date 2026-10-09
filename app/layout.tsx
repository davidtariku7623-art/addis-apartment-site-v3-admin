import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteConfig, whatsappLink, telegramLink } from "../lib/config";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} | Apartments in Addis Ababa`,
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container bar">
            <Link href="/" className="brand">{siteConfig.brandName}</Link>
            <nav>
              <Link href="/#apartments">Apartments</Link>
              <Link href="/#how">How it works</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer" id="contact">
          <div className="container">
            <h2>Talk to us</h2>
            <p>Tell us what you are looking for and we will connect you with the owner.</p>
            <div className="actions">
              <a className="btn wa" href={whatsappLink("Hello, I am looking for an apartment in Addis Ababa.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>
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
