import mongoose from "mongoose";

const eligibilitySchema = new mongoose.Schema(
  {
    minAge: Number,
    maxAge: Number,
    genders: [String],
    states: [String],
    maxIncome: Number,
    minIncome: Number,
    categories: [String],
    occupations: [String],
    anyOf: [mongoose.Schema.Types.Mixed]
  },
  { _id: false }
);

const schemeSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    benefits: { type: [String], required: true },
    eligibilityText: { type: [String], required: true },
    requiredDocuments: { type: [String], required: true },
    link: { type: String, required: true },
    tags: { type: [String], default: [] },
    eligibility: { type: eligibilitySchema, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Scheme", schemeSchema);
