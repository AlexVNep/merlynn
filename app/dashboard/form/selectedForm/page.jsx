import DynamicForm from "/app/ui/form/DynamicForm";
import { getModel } from "@/app/lib/action";

export async function Page() {
  return (
    <>
      <DynamicForm formData={metadata}></DynamicForm>
    </>
  );
}
