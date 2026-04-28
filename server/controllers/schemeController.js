import { getAllSchemes } from "../services/schemeRepository.js";

export async function getSchemes(req, res, next) {
  try {
    const schemes = await getAllSchemes(req.query.q);
    res.json({ count: schemes.length, schemes });
  } catch (error) {
    next(error);
  }
}
