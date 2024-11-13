"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const modelId = process.env.MODEL_ID;
export async function getModel() {
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

export async function formSubmit(prevState, formData) {
  console.log("Hello I almost function");
  const schema = z.object({
    INPUTVAR1: z.coerce.number().gte(-10).lte(45, {
      required_error: "Input is required",
    }),
    INPUTVAR2: z.string({
      required_error: "Input is required",
    }),
    INPUTVAR3: z.coerce.number().gte(1).lte(90, {
      required_error: "Input is required",
    }),
    INPUTVAR4: z.string({
      required_error: "Input is required",
    }),
    INPUTVAR5: z.string({
      required_error: "Input is required",
    }),
    INPUTVAR6: z.string({
      required_error: "Input is required",
    }),
    INPUTVAR7: z.string({
      required_error: "Input is required",
    }),
    INPUTVAR8: z.coerce.number().gte(1).lte(20, {
      required_error: "Input is required",
    }),
    INPUTVAR9: z.coerce.number().gte(1).lte(20, {
      required_error: "Input is required",
    }),
  });

  const validatedFields = schema.safeParse({
    INPUTVAR1: formData.get("INPUTVAR1"),
    INPUTVAR2: formData.get("INPUTVAR2"),
    INPUTVAR3: formData.get("INPUTVAR3"),
    INPUTVAR4: formData.get("INPUTVAR4"),
    INPUTVAR5: formData.get("INPUTVAR5"),
    INPUTVAR6: formData.get("INPUTVAR6"),
    INPUTVAR7: formData.get("INPUTVAR7"),
    INPUTVAR8: formData.get("INPUTVAR8"),
    INPUTVAR9: formData.get("INPUTVAR9"),
  });

  if (!validatedFields) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to submit",
    };
  }
  console.log(validatedFields.data);

  try {
    const res = await fetch(
      `https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12`,
      {
        headers: {
          Authorization: `Token ${process.env.API_KEY}`,
          "Content-Type": "application/vnd.api+json",
        },
        method: "POST",
        body: JSON.stringify({
          data: {
            type: "scenario",
            attributes: {
              input: {
                INPUTVAR1: Number(formData.get("INPUTVAR1")),
                INPUTVAR2: formData.get("INPUTVAR2"),
                INPUTVAR3: Number(formData.get("INPUTVAR3")),
                INPUTVAR4: formData.get("INPUTVAR4"),
                INPUTVAR5: formData.get("INPUTVAR5"),
                INPUTVAR6: formData.get("INPUTVAR6"),
                INPUTVAR7: formData.get("INPUTVAR7"),
                INPUTVAR8: Number(formData.get("INPUTVAR8")),
                INPUTVAR9: Number(formData.get("INPUTVAR9")),
              },
            },
          },
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    return {
      ...prevState,
      data: data,
      message: "Good request",
    };
  } catch (error) {
    return {
      message: "Error Error: Failed",
    };
  }
}
