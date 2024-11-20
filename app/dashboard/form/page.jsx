import InputForm from "/app/ui/form/InputForm";
import { getModel } from "/app/lib/action";

export default async function Home() {
  const data = await getModel();
  const metadata = data;
  return (
    <>
      <h1>FORM</h1>
      <InputForm formData={metadata}></InputForm>
    </>
  );
}
