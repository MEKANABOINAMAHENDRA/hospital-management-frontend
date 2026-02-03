import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getOnlineRequests,
  approveAppointment,
  rejectAppointment,
} from "../../api/nurseApi";
import "../../styles/nurse.css";

export default function NurseOnlineAppointments() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getOnlineRequests();
    setRequests(res.data);
  };

  const approve = async (id) => {
    await approveAppointment(id);
    load();
  };

  const reject = async (id) => {
    await rejectAppointment(id);
    load();
  };

  return (
    <div className="nurse-container">
      <h2 className="nurse-title">Online Appointment Requests</h2>

      {requests.length === 0 && (
        <div className="empty-box">🎉 No pending requests</div>
      )}

      {requests.map((a) => (
        <div key={a.id} className="request-card">
          <div className="request-info">
            <b>{a.patientName}</b>
            <div>{a.doctorName}</div>
            <small>
              {a.appointmentDate} • {a.appointmentTime}
            </small>
          </div>

          <div className="actions">
            <button className="approve" onClick={() => approve(a.id)}>
              Accept
            </button>
            <button className="reject" onClick={() => reject(a.id)}>
              Reject
            </button>
          </div>
        </div>
      ))}

      <button className="back-btn" onClick={() => navigate("/nurse/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}
