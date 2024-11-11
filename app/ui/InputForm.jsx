import ContInput from "../components/ContinuousInput";
import NomInput from "../components/NominalInput";
import { getModel } from "../lib/action";

export default async function InputForm({ onChange }) {
  const data = await getModel();
  const metadata = data.attributes.metadata.attributes;
  const contMetadat = metadata.filter(
    (attribute) => attribute.type === "Continuous"
  );
  const nominalMetadata = metadata.filter(
    (attribute) => attribute.type === "Nominal"
  );

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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}