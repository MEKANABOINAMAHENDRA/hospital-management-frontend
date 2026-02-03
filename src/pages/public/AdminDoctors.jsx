import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllDoctors,
  updateDoctorStatus
} from "../../api/adminApi";

export default function AdminDoctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await getAllDoctors();
      setDoctors(res.data || []);
    } catch (err) {
      alert("Unable to load doctors");
    }
  };

  const toggleStatus = async (id, current) => {
    const confirm = window.confirm(
      `Are you sure you want to ${current ? "DISABLE" : "ENABLE"} this doctor?`
    );
    if (!confirm) return;

    try {
     await updateDoctorStatus(id, !current);

      loadDoctors();
    } catch (err) {
      alert("Failed to update doctor status");
    }
  };

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <h2>Manage Doctors</h2>
        <button style={backBtn} onClick={() => navigate("/admin/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search by name or specialization"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={searchBox}
      />

      {/* TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

  <tbody>
  {filtered.map(d => (
    <tr key={d.id}>
      <td>{d.name}</td>
      <td>{d.specialization}</td>
      <td>{d.phoneNo || "-"}</td>
      <td>{d.experience} yrs</td>
      <td>
        <b style={{ color: d.available ? "green" : "red" }}>
          {d.available ? "ACTIVE" : "INACTIVE"}
        </b>
      </td>
      <td>
        <button
          style={{
            ...btn,
            background: d.available ? "#e53935" : "#43a047",
            marginRight: "8px"
          }}
          onClick={() => toggleStatus(d.id, d.available)}
        >
          {d.available ? "Disable" : "Enable"}
        </button>

        <button
          style={{ ...btn, background: "#1976d2" }}
          onClick={() => navigate(`/admin/edit-doctor/${d.id}`)}
        >
          Edit
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {filtered.length === 0 && <p>No doctors found</p>}
    </div>
  );
}

/* ===== styles ===== */

const page = {
  padding: "30px",
  background: "#f4f6f8",
  minHeight: "100vh"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
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
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff"
};

const btn = {
  padding: "6px 12px",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};
