// SAMPLE DATA ONLY. All buildings and rooms are fictional.
// To add an area: add its name to "areas". To add a building: copy one block below.
// To add a room: add another u(...) line inside a building's "units".
export const areas = ["Bole", "Kazanchis", "Piassa", "Old Airport", "CMC", "Yeka", "Saris", "Gerji", "Megenagna"];
export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export type Unit = {
  id: string; name: string; priceUsd: number; bedrooms: number; bathrooms: number;
  sizeSqm: number; furnished: boolean; stayType: "Short stay" | "Long stay" | "Both";
  availability: "Available" | "Available soon" | "Unavailable";
};
export type Building = {
  id: string; name: string; area: string; color: string; verified: boolean;
  description: string; amenities: string[]; notes: string; units: Unit[];
};

const u = (id: string, name: string, priceUsd: number, bedrooms: number, bathrooms: number, sizeSqm: number,
  furnished: boolean, stayType: Unit["stayType"], availability: Unit["availability"]): Unit =>
  ({ id, name, priceUsd, bedrooms, bathrooms, sizeSqm, furnished, stayType, availability });

export const buildings: Building[] = [
  { id: "bole-garden", name: "Bole Garden Residence", area: "Bole", color: "#2f5d62", verified: true,
    description: "A quiet, well-kept building close to cafes, shops and the airport road.",
    amenities: ["Wi-Fi", "Water tank", "Parking", "24h security"], notes: "Sample building. Utilities billed separately.",
    units: [u("bg-1", "Studio, 2nd floor", 320, 0, 1, 35, true, "Short stay", "Unavailable"),
            u("bg-2", "1-bedroom, 3rd floor", 450, 1, 1, 60, true, "Both", "Available"),
            u("bg-3", "2-bedroom, 4th floor", 700, 2, 2, 95, true, "Both", "Available")] },
  { id: "edna-tower", name: "Edna Tower Apartments", area: "Bole", color: "#7a3e3e", verified: false,
    description: "A modern tower with city views. Our team has not verified this building yet.",
    amenities: ["Elevator", "Generator", "Parking", "Gym"], notes: "Sample building. Not yet verified.",
    units: [u("et-1", "2-bedroom, 5th floor", 900, 2, 2, 110, false, "Long stay", "Available"),
            u("et-2", "3-bedroom penthouse", 1200, 3, 3, 160, true, "Both", "Available soon")] },
  { id: "kazanchis-court", name: "Kazanchis Court", area: "Kazanchis", color: "#44546a", verified: true,
    description: "Compact apartments near offices and embassies, popular with business travelers.",
    amenities: ["Wi-Fi", "Elevator", "Air conditioning"], notes: "Sample building.",
    units: [u("kc-1", "Studio, 1st floor", 320, 0, 1, 35, true, "Short stay", "Available"),
            u("kc-2", "1-bedroom, 2nd floor", 420, 1, 1, 55, true, "Both", "Available soon")] },
  { id: "cmc-family", name: "CMC Family Compound", area: "CMC", color: "#5b4b3a", verified: true,
    description: "Large apartments in a calm compound with a garden, good for families relocating.",
    amenities: ["Garden", "Parking", "Water tank", "Generator"], notes: "Sample building. Minimum 12-month lease.",
    units: [u("cf-1", "3-bedroom, ground floor", 900, 3, 2, 140, false, "Long stay", "Available"),
            u("cf-2", "3-bedroom, 1st floor", 950, 3, 2, 145, false, "Long stay", "Available")] },
  { id: "old-airport-heights", name: "Old Airport Heights", area: "Old Airport", color: "#6b4e71", verified: true,
    description: "A well-kept building with reliable water supply and easy transport.",
    amenities: ["Wi-Fi", "Parking", "Water tank", "24h security"], notes: "Sample building.",
    units: [u("oa-1", "2-bedroom, 2nd floor", 600, 2, 2, 95, true, "Both", "Available")] },
  { id: "gerji-simple", name: "Gerji Simple Homes", area: "Gerji", color: "#4a6b4e", verified: false,
    description: "Simple, clean apartments with easy access to public transport.",
    amenities: ["Water tank", "Parking"], notes: "Sample building. Not yet verified.",
    units: [u("gs-1", "1-bedroom", 250, 1, 1, 50, false, "Long stay", "Available"),
            u("gs-2", "2-bedroom", 330, 2, 1, 70, false, "Long stay", "Available")] },
];

export const buildingsIn = (area: string) => buildings.filter((b) => b.area === area);
export const fromPrice = (b: Building) => Math.min(...b.units.map((x) => x.priceUsd));
