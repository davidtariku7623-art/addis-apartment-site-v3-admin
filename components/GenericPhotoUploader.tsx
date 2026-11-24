"use client";
import { useState } from "react";
import { supabaseBrowser } from "../lib/supabaseClient";

export default function GenericPhotoUploader({ folder, onUploaded }: { folder: string; onUploaded: (path: string) => Promise<void> }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setError("");
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const { error: upErr } = await supabaseBrowser().storage.from("photos").upload(path, file);
    if (upErr) { setError("Upload failed: " + upErr.message); setBusy(false); return; }
    await onUploaded(path);
    setBusy(false);
    e.target.value = "";
  }
  return (
    <div>
      <label className="btn ghost" style={{ display: "inline-block", cursor: "pointer" }}>
        {busy ? "Uploading..." : "+ Upload photo"}
        <input type="file" accept="image/*" onChange={handleFile} disabled={busy} style={{ display: "none" }} />
      </label>
      {error && <p style={{ color: "#b23b3b" }}>{error}</p>}
    </div>
  );
}
