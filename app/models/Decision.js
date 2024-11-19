import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const decisionSchema = new Schema({
  confidence: Number,
  decision: String,
  createdAt: String,
  input: {
    temperature: Number,
    gender: String,
    age: Number,
    caffeineSensitive: String,
    timeOfDay: String,
    pregnanat: String,
    healthConcious: String,
    drinksPerDay: Number,
    drinksToday: Number,
  },
});

const TomDecicions =
  models.TomDecicions || model("TomDecicions", decisionSchema); //ensures the Decision model is only defined once, even if Decision.js is imported multiple times

export default TomDecicions;
