import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminAddDepartment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/department",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("Department added successfully");
      navigate("/admin/departments");
    } catch (err) {
      console.error(err);
      alert("Failed to add department");
    }
  };

  return (
    <div style={page}>
      <h2>Add Department</h2>

      <form onSubmit={handleSubmit} style={formBox}>
        <input
          placeholder="Department Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <textarea
          placeholder="Department Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />

        <div style={btnRow}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/admin/dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  padding: "30px",
  background: "#f4f6f8",
  minHeight: "100vh"
};

const formBox = {
  background: "#fff",
  padding: "25px",
  borderRadius: "8px",
  maxWidth: "400px"
};

const btnRow = {
  marginTop: "15px",
  display: "flex",
  gap: "10px"
};
