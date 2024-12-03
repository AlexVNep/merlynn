"use client";
import DynamicForm from "./DynamicForm";
import { useActionState } from "react";
import { getModel } from "@/app/lib/action";

export default function InputForm({ models }) {
  const [model, formAction, error, isPending] = useActionState(getModel, null);

  const modelsData = models.data;
  console.log(modelsData);
  console.log(model);

  return (
    <>
      <div>
        <h1 className="mb-3 text-gray-500 text-2xl">Scenario Creation</h1>
        <form action={formAction}>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <div className="text-black">
              <h2>Model Selection</h2>
            </div>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="modelId"
                >
                  Select Model
                </label>
                <div className="relative">
                  <select
                    className="peer text-black block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="modelId"
                    name="modelId"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      -- Select a Model --
                    </option>
                    {modelsData.map((model) => (
                      <option
                        key={model.attributes.name + model.id}
                        value={model.id}
                      >
                        {model.attributes.name}
                      </option>
                    ))}
                  </select>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
            <button
              className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              type="submit"
              aria-disabled={isPending}
            >
              Fetch Model
            </button>
          </div>
        </form>
        {model && <DynamicForm modelData={model}></DynamicForm>}
      </div>
    </>
  );
}
