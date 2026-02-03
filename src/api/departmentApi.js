import { getToken } from "./authApi";

const BASE_URL = "https://hospital-management-backend-h0fo.onrender.com";


export async function getDepartments() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/department`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch departments");
  }

  return res.json();
}
