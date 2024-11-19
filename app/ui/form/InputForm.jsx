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
  const contMetadat = data.filter(
    (attribute) => attribute.type === "Continuous"
  );
  const nominalMetadata = data.filter(
    (attribute) => attribute.type === "Nominal"
  );
  console.log(state, "client");

  return (
    <div>
      <form action={formAction}>
        <h2>Health Questionnaire</h2>
        {contMetadat.map((attribute) => (
          <ContInput
            key={attribute.name}
            type="number"
            label={attribute.question}
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
            label={attribute.question}
            option={attribute.domain.values}
            name={attribute.name}
            onChange={onChange}
            htmlFor={attribute.name}
          />
        ))}
        <button type="submit" aria-disabled={isPending}>
          Submit
        </button>
      </form>

      {state.message === "Good request" ? (
        <div>
          <p>Decision: {state.data.data.attributes.decision}</p>
          <p>confidence: {state.data.data.attributes.confidence}</p>
          <p>
            Reason: Because the number of drinks you consume per day is{" "}
            {state.data.data.attributes.reasons[0].antecedent.threshold} or less
          </p>
          <button>Clear</button>
        </div>
      ) : null}
    </div>
  );
}