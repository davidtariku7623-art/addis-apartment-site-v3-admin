export type Area = {
  id: number;
  name: string;
  slug: string;
};

export type UnitRecord = {
  id: number | string;
  building_id: number | string;
  name: string;
  price_usd: number;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number | null;
  furnished: boolean;
  stay_type: string;
  availability: string;
};

export type PhotoRecord = {
  id: number | string;
  building_id: number | string;
  path: string;
  sort_order: number;
};

export type BuildingRecord = {
  id: number | string;
  name: string;
  area_id: number;
  description: string | null;
  notes: string | null;
  amenities: string[] | null;
  verified: boolean;
  featured: boolean;
  areas: Pick<Area, "name" | "slug"> | null;
  units: UnitRecord[];
  photos: PhotoRecord[];
};

export type FormAction = (formData: FormData) => void | Promise<void>;