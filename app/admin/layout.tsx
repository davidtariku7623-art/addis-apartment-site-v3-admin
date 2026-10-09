import Link from "next/link";
import "../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="site-header">
        <div className="container bar">
          <Link href="/admin" className="brand">Admin dashboard</Link>
          <nav>
            <Link href="/admin/buildings/new">+ Add building</Link>
            <Link href="/" target="_blank">View site ↗</Link>
            <form action="/api/logout" method="post" style={{ display: "inline" }}>
              <button className="btn ghost" type="submit">Log out</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="container section">{children}</main>
    </div>
  );
}
