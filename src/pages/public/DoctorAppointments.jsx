import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDoctorAppointments,
  completeAppointment,
  getPrescriptionByAppointment
} from "../../api/doctorApi";

const DoctorAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [prescriptionMap, setPrescriptionMap] = useState({});

  // 🔍 SEARCH STATES
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await getDoctorAppointments();
      const list = res.data || [];
      setAppointments(list);

      // Prescription status
      const map = {};
      await Promise.all(
        list.map(async (a) => {
          try {
            await getPrescriptionByAppointment(a.id);
            map[a.id] = "ADDED";
          } catch {
            map[a.id] = "PENDING";
          }
        })
      );
      setPrescriptionMap(map);
    } catch (err) {
      console.error(err);
    }
  };

  const markCompleted = async (id) => {
    if (!window.confirm("Mark this appointment as COMPLETED?")) return;

    try {
      await completeAppointment(id);
      alert("Appointment marked as COMPLETED");
      loadAppointments();
    } catch {
      alert("Unable to complete appointment");
    }
  };

  /* ===== FILTER + SEARCH LOGIC ===== */
  const filteredAppointments = appointments.filter((a) => {
    // Status filter
    if (filter === "TODAY" && a.appointmentDate !== today) return false;
    if (
      filter !== "ALL" &&
      filter !== "TODAY" &&
      a.status !== filter
    )
      return false;

    // Patient name search
    if (
      searchName &&
      !a.patientName.toLowerCase().includes(searchName.toLowerCase())
    )
      return false;

    // Date search
    if (searchDate && a.appointmentDate !== searchDate) return false;

    return true;
  });

  return (
    <div className="page">
      <h2>My Appointments</h2>
      <button
  style={backBtn}
  onClick={() => navigate("/doctor/dashboard")}
>
  ← Back to Dashboard
</button>


      {/* ===== SEARCH BAR ===== */}
      <div style={searchBar}>
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={searchInput}
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={searchInput}
        />

        <button
          style={clearBtn}
          onClick={() => {
            setSearchName("");
            setSearchDate("");
          }}
        >
          Clear
        </button>
      </div>

      {/* ===== FILTER BUTTONS ===== */}
      <div style={filterBar}>
        {["ALL", "BOOKED",  "COMPLETED", "TODAY"].map((f) => (
          <button
            key={f}
            style={{
              ...filterBtn,
              background: filter === f ? "#1976d2" : "#e0e0e0",
              color: filter === f ? "#fff" : "#000"
            }}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Prescription</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAppointments.map((a) => (
            <tr
              key={a.id}
              style={{
                background:
                  a.status === "COMPLETED"
                    ? "#f1f1f1"
                    : a.appointmentDate === today
                    ? "#fffde7"
                    : "#fff"
              }}
            >
              <td>{a.appointmentDate}</td>
              <td>{a.appointmentTime}</td>
              <td>{a.patientName}</td>

              <td
                style={{
                  fontWeight: "bold",
                  color:
                    a.status === "COMPLETED"
                               ? "green"
                               : "orange"

                }}
              >
                {a.status}
              </td>

              <td
                style={{
                  fontWeight: "bold",
                  color:
                    prescriptionMap[a.id] === "ADDED"
                      ? "green"
                      : "red"
                }}
              >
                {prescriptionMap[a.id] || "—"}
              </td>

              <td>
                <button
                  onClick={() =>
                    navigate(`/doctor/add-prescription/${a.id}`)
                  }
                  disabled={a.status === "COMPLETED"}
                >
                  Add / Edit Prescription
                </button>

                <button
                  style={{ marginLeft: "8px" }}
                  onClick={() => markCompleted(a.id)}
                  disabled={a.status === "COMPLETED"}
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointments;

/* ===== STYLES ===== */

const searchBar = {
  display: "flex",
  gap: "10px",
  marginBottom: "15px",
  flexWrap: "wrap"
};

const searchInput = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const clearBtn = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  background: "#9e9e9e",
  color: "#fff"
};

const filterBar = {
  marginBottom: "15px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const filterBtn = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};
const backBtn = {
  marginBottom: "15px",
  padding: "6px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  background: "#1976d2",
  color: "#fff"
};
