import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const decisionSchema = new Schema({
  confidence: Number,
  decision: String,
});

const Decision = models.Decision || model("Decision", decisionSchema); //ensures the Decision model is only defined once, even if Decision.js is imported multiple times

export default Decision;
