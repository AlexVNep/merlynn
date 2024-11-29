"use client";
import NomInput from "./NominalInput";
import ContInput from "./ContinuousInput";
import { useActionState } from "react";
import { formSubmit } from "@/app/lib/action";

export default function DynamicForm({ modelData }) {
  const [state, formAction, isPending] = useActionState(formSubmit, null);

  const data = modelData.attributes.metadata.attributes;
  const contMetadata = data.filter(
    (attribute) => attribute.type === "Continuous"
  );
  const nominalMetadata = data.filter(
    (attribute) => attribute.type === "Nominal"
  );
  return (
    <div className="pt-10 w-12/12">
      <form action={formAction}>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <div className="text-black">
            <h2>Model Selected: {modelData.attributes.name}</h2>
          </div>
          {contMetadata.map((attribute) => (
            <ContInput
              key={attribute.name}
              type="number"
              label={`${attribute.question}: `}
              name={attribute.name}
              min={attribute.domain.lower}
              max={attribute.domain.upper}
              htmlFor={attribute.name}
            />
          ))}
          {nominalMetadata.map((attribute) => (
            <NomInput
              key={attribute.name}
              label={`${attribute.question}: `}
              option={attribute.domain.values}
              name={attribute.name}
              htmlFor={attribute.name}
            />
          ))}

          <button
            className="flex h-10  mt-4 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            type="submit"
            aria-disabled={isPending}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
//

// <div>

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
