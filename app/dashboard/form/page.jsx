import InputForm from "@/app/ui/form/InputForm";
import { getAllModels, getModel } from "/app/lib/action";

export default async function Page({}) {
  const modelsResponse = await getAllModels();
  const models = modelsResponse || [];

  return (
    <>
      <InputForm models={models}></InputForm>
    </>
  );
}
