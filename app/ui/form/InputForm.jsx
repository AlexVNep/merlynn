"use client";

import ContInput from "./ContinuousInput";
import NomInput from "./NominalInput";
import { useActionState } from "react";
import { formSubmit } from "@/app/lib/action";

const initialState = {
  data: null,
  zodErrors: null,
  message: null,
};

export default function InputForm({ formData = {}, onChange }) {
  const [state, formAction, isPending] = useActionState(
    formSubmit,
    initialState
  );

  const data = formData.attributes.metadata.attributes;
  const contMetadata = data.filter(
    (attribute) => attribute.type === "Continuous"
  );
  const nominalMetadata = data.filter(
    (attribute) => attribute.type === "Nominal"
  );
  console.log(state);

  return (
    <div>
      <form action={formAction}>
        {contMetadata.map((attribute) => (
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
        ))}
        {nominalMetadata.map((attribute) => (
          <NomInput
            key={attribute.name}
            label={`${attribute.question}: `}
            option={attribute.domain.values}
            name={attribute.name}
            onChange={onChange}
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
      </form>

      {state.message === "Good request" && state.data.data ? (
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
      ) : null}
      {state.message === "Good request" && state.data.errors ? (
        <div>
          <p>{state.data.errors[0].title}</p>
          <p>{state.data.errors[0].detail}</p>
        </div>
      ) : null}
    </div>
  );
}
