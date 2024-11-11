"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getModel() {
  const modelId = process.env.MODEL_ID;
  try {
    const data = await fetch(`https://api.up2tom.com/v3/models/${modelId}`, {
      headers: {
        Authorization: `Token ${process.env.API_KEY}`,
        "Content-Type": "application/vnd.api+json",
      },
    });
    const model = await data.json();
    console.log(model.data);
    return model.data;
  } catch (error) {
    console.log(error);
  }
}
