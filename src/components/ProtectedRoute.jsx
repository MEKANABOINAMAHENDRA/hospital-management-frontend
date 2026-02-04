import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../api/authApi";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = getToken();

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return <Navigate to="/login" replace />;
  }

  // 🔥 Normalize role (space-safe)
  const role = decoded.role.replace(/\s+/g, "");

  // 2️⃣ Role NOT allowed → redirect
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Role allowed → show page
  return children;
}
