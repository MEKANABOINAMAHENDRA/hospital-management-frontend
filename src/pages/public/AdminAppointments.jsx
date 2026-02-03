import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAppointments } from "../../api/adminApi";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await getAllAppointments();
      setAppointments(res.data || []);
    } catch (err) {
      alert("Failed to load appointments");
    }
  };

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <h2>All Appointments</h2>

        <button
          style={backBtn}
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.appointmentDate}</td>
              <td>{a.appointmentTime}</td>
              <td>{a.patientName}</td>
              <td>{a.doctorName}</td>
              <td>
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      a.status === "COMPLETED"
                        ? "green"
                        : a.status === "CANCELLED"
                        ? "red"
                        : "#f57c00"
                  }}
                >
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {appointments.length === 0 && (
        <p style={{ marginTop: "15px" }}>No appointments found</p>
      )}
    </div>
  );
};

export default AdminAppointments;

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

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff"
};
