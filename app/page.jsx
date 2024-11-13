import InputForm from "./ui/form/InputForm";
import { getModel } from "./lib/action";

export default async function Home() {
  const data = await getModel();
  const metadata = data;
  return (
    <>
      <h1>Home</h1>
      <InputForm formData={metadata}></InputForm>
    </>
  );
}
