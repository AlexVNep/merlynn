import { getModel } from "@/app/lib/action";
import InputForm from "@/app/ui/form/InputForm";
import { getAllModels } from "/app/lib/action";

export default async function Page({}) {
  const modelsResponse = await getAllModels();
  const models = modelsResponse.data || [];
  const data = await getModel();
  const metadata = data;

  return (
    <>
      <InputForm formData={metadata} models={models}></InputForm>
    </>
  );
}
//
