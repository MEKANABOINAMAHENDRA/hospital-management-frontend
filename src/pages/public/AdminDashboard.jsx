import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPatients,
  getAllDoctors,
  getAllAppointments
} from "../../api/adminApi";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    completed: 0,
    pending: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [p, d, a] = await Promise.all([
        getAllPatients(),
        getAllDoctors(),
        getAllAppointments()
      ]);

      const completed = a.data.filter(
        ap => ap.status === "COMPLETED"
      ).length;

      const pending = a.data.filter(
        ap => ap.status !== "COMPLETED"
      ).length;

      setStats({
        patients: p.data.length,
        doctors: d.data.length,
        appointments: a.data.length,
        completed,
        pending
      });
    } catch (err) {
      alert("Failed to load admin dashboard data");
    }
  };

  return (
    <div style={page}>
      <h2>Admin Dashboard</h2>

      {/* ===== STATISTICS ===== */}
      <div style={grid}>
        <StatCard color="#1976d2" value={stats.patients} label="Patients" />
        <StatCard color="#2e7d32" value={stats.doctors} label="Doctors" />
        <StatCard color="#6a1b9a" value={stats.appointments} label="Appointments" />
        <StatCard color="#388e3c" value={stats.completed} label="Completed" />
        <StatCard color="#f57c00" value={stats.pending} label="Pending" />
      </div>

      {/* ===== ADMIN ACTIONS ===== */}
      <h3 style={{ marginTop: "40px" }}>Administration</h3>

      <div style={navGrid}>
        <NavCard title="➕ Add Doctor" onClick={() => navigate("/admin/add-doctor")} />
        <NavCard title="➕ Add Nurse" onClick={() => navigate("/admin/add-nurse")} />
        <NavCard title="👨‍⚕️ Manage Doctors" onClick={() => navigate("/admin/doctors")} />
        <NavCard title="🧑‍⚕️ Manage Nurses" onClick={() => navigate("/admin/nurses")}
/>

        <NavCard title="🧑‍🤝‍🧑 Manage Patients" onClick={() => navigate("/admin/patients")} />
        <NavCard title="📅 View Appointments" onClick={() => navigate("/admin/appointments")} />
          <NavCard title="🏥 Manage Departments"onClick={() => navigate("/admin/departments")}
/>

      </div>
    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */

const StatCard = ({ value, label, color }) => (
  <div style={{ ...baseCard, background: color }}>
    <h3>{value}</h3>
    <p>{label}</p>
  </div>
);

const NavCard = ({ title, onClick }) => (
  <div style={navCard} onClick={onClick}>
    {title}
  </div>
);

/* ===== STYLES ===== */

const page = {
  padding: "30px",
  background: "#f4f6f8",
  minHeight: "100vh"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  marginTop: "20px"
};

const baseCard = {
  padding: "25px",
  borderRadius: "12px",
  color: "#fff",
  textAlign: "center",
  boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
};

const navGrid = {
  marginTop: "20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px"
};

const navCard = {
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  textAlign: "center",
  cursor: "pointer",
  fontSize: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};
