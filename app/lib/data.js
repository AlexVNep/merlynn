import mongoose from "mongoose";
import TomDecicions from "../models/Decision";

main().catch((err) => console.log(err));

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  await mongoose.connect(MONGODB_URI);
}

export async function fetchFilteredDecisions() {
  try {
    console.log("Fetching decisions...");
    const decisions = await TomDecicions.find({})
      .sort({ createdAt: -1 })
      .exec();
    console.log("Decisions fetched:", decisions);
    return JSON.stringify(decisions);
  } catch (error) {
    console.error("Error fetching decisions:", error);
    return [];
  }
}
