"use client";
import { useState } from "react";
import { supabaseBrowser } from "../lib/supabaseClient";
import { addPhotoRecord } from "../lib/actions";

export default function PhotoUploader({ buildingId, nextOrder }: { buildingId: number; nextOrder: number }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setError("");
    const supabase = supabaseBrowser();
    const path = `building-${buildingId}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error: upErr } = await supabase.storage.from("photos").upload(path, file);
    if (upErr) { setError("Upload failed: " + upErr.message); setBusy(false); return; }
    await addPhotoRecord(buildingId, path, nextOrder);
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
