import React, { useEffect, useState } from "react";
import { getMyAppointments } from "../../api/patientApi";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await getMyAppointments();
      setAppointments(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load appointments");
    }
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2>My Appointments</h2>
        <button
          style={backBtn}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {appointments.length === 0 ? (
        <div style={emptyBox}>No appointments found</div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} style={rowStyle}>
                <td>{a.appointmentDate}</td>
                <td>{a.appointmentTime}</td>
                <td>{a.doctorName}</td>
                <td>{a.departmentName || "-"}</td>
                <td>
                  <span style={statusBadge(a.status)}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;

/* ================= STYLES ================= */

const pageStyle = {
  padding: "30px",
  background: "#f4f6f8",
  minHeight: "100vh",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const backBtn = {
  padding: "8px 14px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  background: "#fff",
  borderCollapse: "collapse",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const rowStyle = {
  borderBottom: "1px solid #eee",
};

const emptyBox = {
  padding: "20px",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const statusBadge = (status) => ({
  padding: "4px 12px",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "13px",
  background:
    status === "BOOKED"
      ? "#ff9800"
      : status === "COMPLETED"
      ? "#4caf50"
      : "#f44336",
});
