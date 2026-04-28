import dotenv from "dotenv";
import mongoose from "mongoose";
import Scheme from "./models/Scheme.js";
import { schemes } from "./data/schemes.js";

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is required to seed MongoDB.");
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);
await Scheme.deleteMany({});
await Scheme.insertMany(schemes);
await mongoose.disconnect();

console.log(`Seeded ${schemes.length} schemes.`);
