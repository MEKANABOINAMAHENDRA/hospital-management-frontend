import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPatients,
  searchPatients
} from "../../api/adminApi";

export default function AdminPatients() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await getAllPatients();
      setPatients(res.data || []);
    } catch (err) {
      setError("Failed to load patients");
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      loadPatients();
      return;
    }

    try {
      const res = await searchPatients(search);
      setPatients(res.data || []);
    } catch {
      alert("Search failed");
    }
  };

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <h2>Patients (View Only)</h2>
        <button style={backBtn} onClick={() => navigate("/admin/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {/* SEARCH */}
      <div style={searchBox}>
        <input
          placeholder="Search by name / phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {patients.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>
                No patients found
              </td>
            </tr>
          )}

          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name || "-"}</td>
              <td>{p.phoneno || "-"}</td>
              <td>{p.gender || "-"}</td>
              <td>{p.age || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

const searchBox = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
};

const table = {
  width: "100%",
  background: "#fff",
  borderCollapse: "collapse",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};
