import { getModels } from "../lib/action";

export default async function Models() {
  const models = await getModels();

  return (
    <>
      <h1>Models</h1>
      <ul>
        {models.data.map((model) => (
          <li key={model.id}>{model.id}</li>
        ))}
      </ul>
    </>
  );
}
