import { useState } from "react";
import { registerUser } from "./api/authApi";
import "./styles/register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "PATIENT", // ✅ FIXED
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      setMsg("Registration successful. Please login.");
    } catch (err) {
      console.error(err);
      setMsg("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Patient Registration</h2>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button type="submit">Register</button>

        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
}
