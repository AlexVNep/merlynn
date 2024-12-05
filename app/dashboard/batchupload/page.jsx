import UploadForm from "@/app/ui/batch/uploadbatch";
import { getAllModels } from "@/app/lib/action";

export default async function Page() {
  const data = await getAllModels();
  const modelsData = data;

  return (
    <main>
      <UploadForm modelsData={modelsData}></UploadForm>
    </main>
  );
}
