import DownloadBatch from "@/app/ui/batch/downloadbatch";
import { getAllModels } from "@/app/lib/action";

export default async function Page() {
  const data = await getAllModels();
  const modelsData = data;

  return (
    <main>
      <DownloadBatch modelsData={modelsData}></DownloadBatch>
    </main>
  );
}
