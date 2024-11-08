export async function getModels() {
  try {
    const data = await fetch("https://api.up2tom.com/v3/models", {
      headers: {
        Authorization: `Token ${process.env.DEMO_KEY}`,
        "Content-Type": "application/vnd.api+json",
      },
    });
    const models = await data.json();
    console.log(models);
    return models;
  } catch (error) {
    console.log(error);
  }
}
