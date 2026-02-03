const BASE_URL = "http://localhost:8080";

// ================= REGISTER =================
export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Register failed");
  }

  return res.text();
}

// ================= LOGIN =================
export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  // ✅ BACKEND RETURNS PLAIN TOKEN STRING
  const token = await res.text();

  // Save token only (role extracted later)
  localStorage.setItem("token", token);

  return token;
}

// ================= TOKEN =================
export const getToken = () => {
  return localStorage.getItem("token");
};

// ================= LOGOUT =================
export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
