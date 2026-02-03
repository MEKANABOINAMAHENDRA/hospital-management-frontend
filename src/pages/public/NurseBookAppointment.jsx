import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchPatientByPhone,
  bookOfflineAppointment,
  getAllDoctors,
  getLastAppointment,
} from "../../api/nurseApi";
import "../../styles/nurse.css";

export default function NurseBookAppointment() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState(null);
  const [lastAppointment, setLastAppointment] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  /* ================= LOAD DOCTORS ================= */
  useEffect(() => {
    getAllDoctors()
      .then((res) => setDoctors(res.data))
      .catch(() => alert("Failed to load doctors"));
  }, []);

  /* ================= SEARCH PATIENT ================= */
  const search = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    try {
      const res = await searchPatientByPhone(phone);

      if (res.data) {
        // Existing patient
        setPatient(res.data);
        setNotFound(false);

        try {
          const last = await getLastAppointment(res.data.id);
          setLastAppointment(last.data);
        } catch {
          setLastAppointment(null);
        }
      } else {
        // New walk-in patient
        setPatient(null);
        setLastAppointment(null);
        setNotFound(true);
      }
    } catch {
      alert("Error searching patient");
    }
  };

  /* ================= BOOK OFFLINE APPOINTMENT ================= */
  const book = async () => {
    try {
      if (!doctorId || !date || !time) {
        alert("Please select doctor, date and time");
        return;
      }

      if (
        notFound &&
        (!newPatient.name || !newPatient.age || !newPatient.gender)
      ) {
        alert("Please enter patient name, age and gender");
        return;
      }

      const formattedTime = `${time}:00`; // HH:mm:ss

      // 🔥 EXACT DTO EXPECTED BY BACKEND
      await bookOfflineAppointment({
        doctorId,
        appointmentDate: date,
        appointmentTime: formattedTime,
        phoneno: phone,        // MUST be phoneno
        name: newPatient.name,
        age: Number(newPatient.age),
        gender: newPatient.gender,
      });

      alert("Appointment booked successfully");
      navigate("/nurse/dashboard");
    } catch (err) {
      console.error(err);
      alert("Booking failed. Backend rejected the request.");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="form-card">
      <h2>Offline Appointment (Walk-in)</h2>

      {/* SEARCH */}
      <div className="row">
        <input
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>

      {/* EXISTING PATIENT INFO */}
      {patient && (
        <div className="info-box">
          <b>{patient.name}</b> | {patient.gender} | {patient.age}
        </div>
      )}

      {/* LAST APPOINTMENT */}
      {lastAppointment && (
        <div className="table-card">
          <h4>Last Appointment</h4>
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{lastAppointment.doctorName}</td>
                <td>{lastAppointment.appointmentDate}</td>
                <td>{lastAppointment.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* NEW WALK-IN PATIENT */}
      {notFound && (
        <>
          <input
            placeholder="Patient Name"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) =>
              setNewPatient({ ...newPatient, age: e.target.value })
            }
          />
          <input
            placeholder="Gender (Male / Female)"
            value={newPatient.gender}
            onChange={(e) =>
              setNewPatient({ ...newPatient, gender: e.target.value })
            }
          />
        </>
      )}

      {/* BOOKING */}
      <select
        value={doctorId}
        onChange={(e) => setDoctorId(Number(e.target.value))}
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
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        step="60"
      />

      <button className="primary" onClick={book}>
        Book Appointment
      </button>

      <button className="back-btn" onClick={() => navigate("/nurse/dashboard")}>
        ← Back
      </button>
    </div>
  );
}
