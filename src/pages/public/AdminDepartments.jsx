import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDepartments } from "../../api/adminApi";

export default function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(res.data || []);
    } catch {
      alert("Failed to load departments");
    }
  };

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <h2>Manage Departments</h2>

        <button style={backBtn} onClick={() => navigate("/admin/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {/* ADD BUTTON */}
      <button
        style={addBtn}
        onClick={() => navigate("/admin/add-department")}
      >
        + Add Department
      </button>

      {/* TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
          </tr>
        </thead>

        <tbody>
          {departments.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {departments.length === 0 && (
        <p style={{ marginTop: "15px" }}>No departments found</p>
      )}
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  padding: "30px",
  background: "#f4f6f8",
  minHeight: "100vh"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const backBtn = {
  padding: "8px 14px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const addBtn = {
  padding: "10px 16px",
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "15px"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff"
};
