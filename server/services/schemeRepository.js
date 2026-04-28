import { databaseState } from "../config/db.js";
import Scheme from "../models/Scheme.js";
import { schemes as fallbackSchemes } from "../data/schemes.js";
import { searchSchemes } from "./eligibilityService.js";

export async function getAllSchemes(query = "") {
  if (databaseState.isConnected) {
    const filter = query
      ? {
          $or: [
            { name: new RegExp(query, "i") },
            { description: new RegExp(query, "i") },
            { tags: new RegExp(query, "i") }
          ]
        }
      : {};
    return Scheme.find(filter).lean().sort({ name: 1 });
  }

  return searchSchemes(query, fallbackSchemes).sort((a, b) => a.name.localeCompare(b.name));
}
