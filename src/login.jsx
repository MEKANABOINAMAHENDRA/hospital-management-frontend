import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./api/authApi";
import { jwtDecode } from "jwt-decode";
import "./styles/login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const token = await loginUser(form);

const decoded = jwtDecode(token);
console.log("JWT DECODED:", decoded);

const role = decoded.role; // PATIENT / ADMIN / DOCTOR / NURSE
localStorage.setItem("role", role);

if (role === "PATIENT") {
  navigate("/dashboard");
} else if (role === "DOCTOR") {
  navigate("/doctor/dashboard");
} else if (role === "NURSE") {
  navigate("/nurse/dashboard");
} else if (role === "ADMIN") {
  navigate("/admin/dashboard");
} else {
  setMsg("Unknown role");
}

    } catch (err) {
      setMsg("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          placeholder="Username"
          required
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>

        {msg && <p className="msg error">{msg}</p>}

        <p className="register-hint">
          Don’t have an account?{" "}
          <Link to="/register">Register as Patient</Link>
        </p>
      </form>
    </div>
  );
}
