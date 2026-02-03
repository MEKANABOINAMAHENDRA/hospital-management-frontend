import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTodayAppointments,
  completeAppointment,
} from "../../api/nurseApi";
import "../../styles/nurse.css";

export default function NurseTodayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Load today's appointments + auto refresh
  useEffect(() => {
    loadAppointments();

    const interval = setInterval(loadAppointments, 10000); // 🔥 auto refresh
    return () => clearInterval(interval);
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await getTodayAppointments();
      setAppointments(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load today's appointments");
    }
  };

  // Mark appointment as completed
  const markCompleted = async (id) => {
    const confirm = window.confirm(
      "Are you sure the patient consultation is completed?"
    );
    if (!confirm) return;

    try {
      await completeAppointment(id);
      loadAppointments(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to complete appointment");
    }
  };

  return (
    <div className="nurse-container">
      <h2 className="nurse-title">Today's Appointments</h2>

      {appointments.length === 0 && (
        <div className="empty-box">🕒 No appointments today</div>
      )}

      {appointments.length > 0 && (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a, index) => (
              <tr key={a.id}>
                <td>{index + 1}</td>
                <td>{a.patientName}</td>
                <td>{a.doctorName}</td>
                <td>{a.appointmentTime?.substring(0, 5) || "-"}</td>

                <td>
                  <span
                    className={`status ${
                      a.status ? a.status.toLowerCase() : ""
                    }`}
                  >
                    {a.status}
                  </span>
                </td>

                <td>
                  {a.status !== "COMPLETED" ? (
                    <button
                      className="complete-btn"
                      onClick={() => markCompleted(a.id)}
                    >
                      Complete
                    </button>
                  ) : (
                    <span className="completed-text">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="back-btn"
        onClick={() => navigate("/nurse/dashboard")}
      >
        ← Back
      </button>
    </div>
  );
}
