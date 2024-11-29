import BatchForm from "@/app/ui/batch/batchform";
import { getAllModels } from "@/app/lib/action";

export default async function Page() {
  const data = await getAllModels();
  const modelsData = data;

  return (
    <main>
      <BatchForm modelsData={modelsData}></BatchForm>
    </main>
  );
}
