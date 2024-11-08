import { getModel } from "../lib/action";

export default async function QuestionList() {
  const data = await getModel();
  // const attributes = data.attributes.metadata.attributes;
  return (
    <main>
      <h1>{data.attributes.name}</h1>
      <ul>
        {data.attributes.metadata.attributes.map((attribute, index) => (
          <li key={index}>{attribute.question}</li>
        ))}
      </ul>
    </main>
  );
}
