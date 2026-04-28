import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 15000
});

export async function getSchemes(query = "") {
  const response = await api.get("/schemes", { params: query ? { q: query } : {} });
  return response.data;
}

export async function checkEligibility(profile) {
  const response = await api.post("/check-eligibility", profile);
  return response.data;
}

export async function sendChatMessage(payload) {
  const response = await api.post("/chat", payload);
  return response.data;
}
