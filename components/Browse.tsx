"use client";
import { useState } from "react";
import type { BuildingRecord } from "../lib/types";
import BuildingCard from "./ApartmentCard";

export default function Browse({ buildings }: { buildings: BuildingRecord[] }) {
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [furn, setFurn] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const results = buildings.filter((building) =>
    building.units.some((unit) =>
      (!maxPrice || unit.price_usd <= Number(maxPrice)) &&
      (!beds || (beds === "3" ? unit.bedrooms >= 3 : unit.bedrooms === Number(beds))) &&
      (!furn || unit.furnished === (furn === "yes")) &&
      (!availableOnly || unit.availability === "Available")
    )
  );

  return (
    <div>
      <div className="filters">
        <input type="number" min="0" placeholder="Max price (USD)" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} aria-label="Maximum price" />
        <select value={beds} onChange={(e) => setBeds(e.target.value)} aria-label="Bedrooms">
          <option value="">Any bedrooms</option>
          <option value="0">Studio</option><option value="1">1</option><option value="2">2</option><option value="3">3 or more</option>
        </select>
        <select value={furn} onChange={(e) => setFurn(e.target.value)} aria-label="Furnished">
          <option value="">Furnished or not</option><option value="yes">Furnished</option><option value="no">Unfurnished</option>
        </select>
        <label className="check"><input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} /> Available now</label>
      </div>
      <p className="muted">{results.length} building{results.length === 1 ? "" : "s"} found</p>
      {results.length === 0 ? <p className="empty">Nothing matches. Try removing a filter.</p> : (
        <div className="grid">{results.map((b) => <BuildingCard key={b.id} b={b} />)}</div>
      )}
    </div>
  );
}
