"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError("Wrong email or password. Please try again."); return; }
    router.push("/admin"); router.refresh();
  }

  return (
    <div className="container section" style={{ maxWidth: 380 }}>
      <h1>Admin login</h1>
      <form onSubmit={handleLogin} className="admin-form">
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <p style={{ color: "#b23b3b" }}>{error}</p>}
        <button className="btn" disabled={loading}>{loading ? "Checking..." : "Log in"}</button>
      </form>
    </div>
  );
}
