import { useNavigate } from "react-router-dom";
import "../../styles/nurse.css";

export default function NurseDashboard() {
  const navigate = useNavigate();

  return (
    <div className="nurse-container">
      <h2 className="nurse-title">Nurse Dashboard</h2>

      <div className="nurse-cards">
        <div
          className="card primary"
          onClick={() => navigate("/nurse/book-appointment")}
        >
          ➕
          <span>New Appointment</span>
          <small>Walk-in patient booking</small>
        </div>

        <div
          className="card warning"
          onClick={() => navigate("/nurse/requests")}
        >
          🔔
          <span>Online Requests</span>
          <small>Approve / Reject</small>
        </div>

        <div
          className="card success"
          onClick={() => navigate("/nurse/today")}
        >
          📅
          <span>Today Appointments</span>
          <small>Doctor schedules</small>
        </div>
      </div>
    </div>
  );
}
