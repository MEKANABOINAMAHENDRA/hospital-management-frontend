import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllNurses,
  updateNurseStatus
} from "../../api/adminApi";

export default function AdminNurses() {
  const [nurses, setNurses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadNurses();
  }, []);

  const loadNurses = async () => {
    try {
      const res = await getAllNurses();
      setNurses(res.data || []);
    } catch {
      alert("Failed to load nurses");
    }
  };

  const toggleStatus = async (nurse) => {
    try {
      await updateNurseStatus(nurse.id, !nurse.enabled);
      loadNurses();
    } catch {
      alert("Failed to update nurse status");
    }
  };

  return (
    <div style={page}>
      <div style={header}>
        <h2>Manage Nurses</h2>
        <button style={backBtn} onClick={() => navigate("/admin/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <button style={addBtn} onClick={() => navigate("/admin/add-nurse")}>
        + Add Nurse
      </button>

      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Edit</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {nurses.map(n => (
            <tr key={n.id}>
              <td>{n.id}</td>
              <td>{n.username}</td>

              <td>
                <button
                  style={editBtn}
                  onClick={() => navigate(`/admin/edit-nurse/${n.id}`)}
                >
                  Edit
                </button>
              </td>

              <td style={{ color: n.enabled ? "green" : "red" }}>
                {n.enabled ? "ACTIVE" : "INACTIVE"}
              </td>

              <td>
                <button
                  style={{
                    padding: "6px 12px",
                    background: n.enabled ? "#d32f2f" : "#2e7d32",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                  onClick={() => toggleStatus(n)}
                >
                  {n.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {nurses.length === 0 && <p>No nurses found</p>}
    </div>
  );
}
/* ================= STYLES ================= */

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

const editBtn = {
  padding: "6px 12px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};
