import { createPackage } from "../../../../lib/moreActions";
import PackageForm from "../../../../components/PackageForm";

export default function NewPackage() {
  return (
    <div style={{ maxWidth: 560 }}>
      <h1>Add a travel package</h1>
      <PackageForm action={createPackage} />
    </div>
  );
}
