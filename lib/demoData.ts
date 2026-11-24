import { areas, buildings, slugify } from "./data";
import type { Area, BuildingRecord } from "./types";

export const demoAreas: Area[] = areas
  .filter((name) => buildings.some((building) => building.area === name))
  .map((name) => ({
    id: areas.indexOf(name) + 1,
    name,
    slug: slugify(name),
  }));

export const demoBuildings: BuildingRecord[] = buildings.map((building) => ({
  id: building.id,
  name: building.name,
  area_id: areas.indexOf(building.area) + 1,
  description: building.description,
  notes: building.notes,
  amenities: building.amenities,
  verified: building.verified,
  featured: false,
  areas: {
    name: building.area,
    slug: slugify(building.area),
  },
  units: building.units.map((unit) => ({
    id: unit.id,
    building_id: building.id,
    name: unit.name,
    price_usd: unit.priceUsd,
    bedrooms: unit.bedrooms,
    bathrooms: unit.bathrooms,
    size_sqm: unit.sizeSqm,
    furnished: unit.furnished,
    stay_type: unit.stayType,
    availability: unit.availability,
  })),
  photos: [],
}));