import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors, bookAppointment } from "../../api/patientApi";

const PatientBookAppointment = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load doctors");
    }
  };

  const submitBooking = async () => {
    setError("");

    if (!doctorId || !date || !time) {
      setError("Please select doctor, date and time");
      return;
    }

    // ✅ IMPORTANT FIX: Spring expects HH:mm:ss
    const formattedTime = time.length === 5 ? `${time}:00` : time;

    const payload = {
      doctorId: Number(doctorId),
      appointmentDate: date,          // yyyy-MM-dd
      appointmentTime: formattedTime, // HH:mm:ss
    };

    console.log("BOOKING PAYLOAD:", payload);

    try {
      await bookAppointment(payload);
      alert("Appointment booking is sent please check after 5 minutes for slot is booked or not.");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Booking failed");
    }
  };

  return (
    <div style={pageStyle}>
      <h2>Book Appointment</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={card}>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          style={input}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} – {d.specialization}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={input}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={input}
        />

        <button style={btn} onClick={submitBooking}>
          Book Appointment
        </button>

        <button
          style={secondaryBtn}
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PatientBookAppointment;

/* ================= STYLES ================= */

const pageStyle = {
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const card = {
  width: "350px",
  padding: "20px",
  borderRadius: "10px",
  background: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const secondaryBtn = {
  ...btn,
  background: "#999",
  marginTop: "10px",
};
