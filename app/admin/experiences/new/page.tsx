import { supabaseServer } from "../../../../lib/supabaseServer";
import { createExperience } from "../../../../lib/moreActions";
import ExperienceForm from "../../../../components/ExperienceForm";

export default async function NewExperience() {
  const supabase = await supabaseServer();
  const { data: categories } = await supabase.from("experience_categories").select("*").order("name");
  return (
    <div style={{ maxWidth: 560 }}>
      <h1>Add an experience</h1>
      <ExperienceForm categories={categories ?? []} action={createExperience} />
    </div>
  );
}
