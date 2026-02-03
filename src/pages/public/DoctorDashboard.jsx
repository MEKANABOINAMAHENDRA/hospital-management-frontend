import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDoctorProfile,
  getDoctorAppointments
} from "../../api/doctorApi";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const profileRes = await getDoctorProfile();
      setDoctor(profileRes.data);

      const apptRes = await getDoctorAppointments();
      setAppointments(apptRes.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard");
    }
  };

  /* ===== COUNTS ===== */
  const today = new Date().toISOString().split("T")[0];

  const todayCount = appointments.filter(
    a => a.appointmentDate === today
  ).length;

  const pendingCount = appointments.filter(
    a => a.status !== "COMPLETED"
  ).length;

  const completedCount = appointments.filter(
    a => a.status === "COMPLETED"
  ).length;

  return (
    <div style={pageStyle}>
      <h2>Doctor Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ===== SUMMARY CARDS ===== */}
      <div style={summaryGrid}>
        <div style={summaryCard}>
          <h3>{todayCount}</h3>
          <p>Today's Appointments</p>
        </div>

        <div style={summaryCard}>
          <h3>{pendingCount}</h3>
          <p>Pending</p>
        </div>

        <div style={summaryCard}>
          <h3>{completedCount}</h3>
          <p>Completed</p>
        </div>
      </div>

      {/* ===== PROFILE ===== */}
      {doctor && (
        <div style={profileBox}>
          <h3>My Profile</h3>
          <p><b>Name:</b> {doctor.name}</p>
          <p><b>Specialization:</b> {doctor.specialization}</p>
          <p><b>Phone:</b> {doctor.phoneNo}</p>
          <p><b>Experience:</b> {doctor.experience} years</p>
          <p><b>Qualification:</b> {doctor.qualification}</p>
        </div>
      )}

      {/* ===== ACTION CARDS ===== */}
      <div style={grid}>
        <div
          style={card}
          onClick={() => navigate("/doctor/appointments")}
        >
          <h3>Appointments</h3>
          <p>View and manage patient appointments</p>
        </div>

        <div
          style={card}
          onClick={() => navigate("/doctor/prescriptions")}
        >
          <h3>Prescriptions</h3>
          <p>View & manage prescriptions</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

/* ===== styles ===== */

const pageStyle = {
  padding: "30px",
  minHeight: "100vh",
  background: "#f4f6f8"
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginBottom: "25px"
};

const summaryCard = {
  background: "#1976d2",
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
};

const profileBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "25px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px"
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};
