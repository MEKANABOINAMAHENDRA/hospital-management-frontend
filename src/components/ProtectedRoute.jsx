import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../api/authApi";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    return <Navigate to="/login" replace />;
  }

  const role = decoded.role; // PATIENT / ADMIN / DOCTOR / NURSE

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
