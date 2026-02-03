import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../api/authApi";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = getToken();

  // 🔴 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return <Navigate to="/login" replace />;
  }

  const role = decoded.role; // ROLE FROM JWT

  // 🔴 Role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Access allowed
  return children;
}
