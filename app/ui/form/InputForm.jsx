"use client";

import ContInput from "./ContinuousInput";
import NomInput from "./NominalInput";
import { useActionState, useState } from "react";
import { getModel } from "@/app/lib/action";

export default function InputForm({ models, formData, onChange }) {
  const [selectedModel, setSelectedModel] = useState("");

  const { isPending, data: modelData, error } = useActionState(getModel);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct a FormData object and call the action
    const formData = new FormData();
    formData.append("modelId", selectedModel);

    try {
      await getModel(formData); // Call the action
    } catch (err) {
      console.error("Error during submission:", err);
    }
    console.log({ data: modelData });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-black text-2xl">Select a model</h1>
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
                    className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="modelId"
                    name="modelId"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="" disabled>
                      -- Select a Model --
                    </option>
                    {models.map((model) => (
                      <option
                        key={model.attributes.name + model.id}
                        value={model.id}
                      >
                        {model.attributes.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )} */}
              </div>
            </div>
            <button
              className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              type="submit"
              aria-disabled={isPending}
            >
              {isPending ? "Loading..." : "Fetch Model"}
            </button>
          </div>
        </form>
      </div>
      {/* Show the fetched model data */}
      {modelData && (
        <div>
          <h3>Fetched Model Data:</h3>
          <pre>{JSON.stringify(modelData, null, 2)}</pre>
        </div>
      )}

      {/* Show any error messages */}
      {error && (
        <div style={{ color: "red" }}>
          <p>Error: {error.message}</p>
        </div>
      )}
    </>
  );
}
// const data = formData.attributes.metadata.attributes;
// const contMetadata = data.filter(
//   (attribute) => attribute.type === "Continuous"
// );
// const nominalMetadata = data.filter(
//   (attribute) => attribute.type === "Nominal"
// );

// <div>
{
  /* <form action={formAction}> */
}
{
  /* {contMetadata.map((attribute) => (
    <ContInput
      key={attribute.name}
      type="number"
      label={`${attribute.question}: `}
      name={attribute.name}
      onChange={onChange}
      min={attribute.domain.lower}
      max={attribute.domain.upper}
      htmlFor={attribute.name}
    />
  ))} */
}
{
  /* {nominalMetadata.map((attribute) => (
    <NomInput
      key={attribute.name}
      label={`${attribute.question}: `}
      option={attribute.domain.values}
      name={attribute.name}
      onChange={onChange}
      htmlFor={attribute.name}
    />
  ))} */
}
{
  /* <button
      className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      type="submit"
      aria-disabled={isPending}
    >
      Submit
    </button> */
}
{
  /* </form> */
}

{
  /* {state.message === "Good request" && state.data.data ? (
    <div>
      <p>Decision: {state.data.data.attributes.decision}</p>
      <p>confidence: {state.data.data.attributes.confidence}</p>
      <p>
        Reason: Because the number of drinks you consume per day is{" "}
        {state.data.data.attributes.reasons?.[0]?.antecedent?.threshold ?? // Nullish coalescing operator (??)
          "greater than 1"}
      </p>

      <button>Clear</button>
    </div>
  ) : null} */
}
{
  /* {state.message === "Good request" && state.data.errors ? (
    <div>
      <p>{state.data.errors[0].title}</p>
      <p>{state.data.errors[0].detail}</p>
    </div>
  ) : null} */
}
{
  /* </div> */
}
