import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import patientApi, {
  getMyAppointments,
  getMyPrescriptions,
  getMyBills,
} from "../../api/patientApi";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
  try {
    const patientRes = await patientApi.getMyProfile();
    setPatient(patientRes.data);

    const [a, p, b] = await Promise.all([
      getMyAppointments(),
      getMyPrescriptions(),
      getMyBills(),
    ]);

    setAppointments(a?.data || []);
    setPrescriptions(p?.data || []);
    setBills(b?.data || []);
    setLoading(false);
  } catch (err) {
    if (err?.response?.status === 404) {
      navigate("/patient/create-profile", { replace: true });
      return; // 🔴 EXIT COMPLETELY
    }

    setError("Unable to load dashboard data");
    setLoading(false);
  }
};


  // 🔄 Loading state
  if (loading) {
    return <p style={{ padding: "24px" }}>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <h2>Patient Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {patient && (
        <>
          {/* ================= PROFILE ================= */}
          <div style={profileCard}>
            <h3>My Profile</h3>

            <p><b>Name:</b> {patient.name}</p>
            <p><b>Age:</b> {patient.age}</p>
            <p><b>Gender:</b> {patient.gender}</p>
            <p><b>Phone:</b> {patient.phoneno}</p>
            <p><b>Address:</b> {patient.address}</p>

            <button
              style={primaryBtn}
              onClick={() => navigate("/patient/book-appointment")}
            >
              Book Appointment
            </button>

            <div style={{ marginTop: "10px" }}>
              <button
                style={primaryBtn}
                onClick={() => navigate("/public/edit-profile")}
              >
                Edit Profile
              </button>

              <button
                style={secondaryBtn}
                onClick={() => navigate("/my-bills")}
              >
                View Bills
              </button>

              <button
                style={secondaryBtn}
                onClick={() => navigate("/my-prescriptions")}
              >
                View Prescriptions
              </button>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div style={gridStyle}>
            <div
              style={clickCard}
              onClick={() => navigate("/patient/appointments")}
            >
              <h3>Appointments</h3>
              <h1>{appointments.length}</h1>
            </div>

            <div style={cardStyle}>
              <h3>Prescriptions</h3>
              <h1>{prescriptions.length}</h1>
            </div>

            <div style={cardStyle}>
              <h3>Bills</h3>
              <h1>{bills.length}</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* ================= STYLES ================= */

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginTop: "24px",
};

const profileCard = {
  padding: "20px",
  borderRadius: "10px",
  background: "#ffffff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};

const cardStyle = {
  padding: "20px",
  borderRadius: "10px",
  background: "#f9f9f9",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const clickCard = {
  ...cardStyle,
  cursor: "pointer",
};

const primaryBtn = {
  padding: "8px 14px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
};

const secondaryBtn = {
  padding: "8px 14px",
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
};

export default PatientDashboard;
