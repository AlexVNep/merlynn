"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import mongoose from "mongoose";
import TomDecicions from "../models/Decision";
import User from "../models/User";
import bcrypt from "bcryptjs";

main().catch((err) => console.log(err));

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  await mongoose.connect(MONGODB_URI);
}

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
  const schema = z.object({
    INPUTVAR1: z.coerce.number().gte(-10).lte(45, {
      required_error: "Input is required",
      invalid_type_error: "Please input a temperature",
    }),
    INPUTVAR2: z.string({
      required_error: "Input is required",
    }),
    INPUTVAR3: z.coerce.number().gte(1).lte(90, {
      required_error: "Input is required",
      invalid_type_error: "Please input an age",
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
      invalid_type_error: "Invalid number",
    }),
    INPUTVAR9: z.coerce.number().gte(1).lte(20, {
      required_error: "Input is required",
      invalid_type_error: "Invalid number",
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
  // console.log(validatedFields.data);

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

    if (data.errors) {
      console.log("This is the working error");
    } else {
      createDecision(data);
    }

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

async function createDecision(data) {
  const test = await TomDecicions.create({
    confidence: data.data.attributes.confidence,
    decision: data.data.attributes.decision,
    createdAt: data.data.attributes.timestamp,
    input: {
      temperature: data.data.attributes.input.INPUTVAR1,
      gender: data.data.attributes.input.INPUTVAR2,
      age: data.data.attributes.input.INPUTVAR3,
      caffeineSensitive: data.data.attributes.input.INPUTVAR4,
      timeOfDay: data.data.attributes.input.INPUTVAR5,
      INPUTVpregnanatAR6: data.data.attributes.input.INPUTVAR6,
      healthConcious: data.data.attributes.input.INPUTVAR7,
      drinksPerDay: data.data.attributes.input.INPUTVAR8,
      drinksToday: data.data.attributes.input.INPUTVAR9,
    },
  });
}

export async function createUserAction(state, formData) {
  const SignupFormSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
  });

  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const { username, email, password } = validatedFields.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Error("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const user = await User.findOne({ username: data.username });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  revalidatePath("/login");
  redirect("/login");
}
