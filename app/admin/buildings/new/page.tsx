import { supabaseServer } from "../../../../lib/supabaseServer";
import { createBuilding } from "../../../../lib/actions";
import BuildingForm from "../../../../components/BuildingForm";

export default async function NewBuildingPage() {
  const supabase = await supabaseServer();
  const { data: areas } = await supabase.from("areas").select("*").order("name");
  return (
    <div style={{ maxWidth: 520 }}>
      <h1>Add a building</h1>
      <BuildingForm areas={areas ?? []} action={createBuilding} />
    </div>
  );
}
