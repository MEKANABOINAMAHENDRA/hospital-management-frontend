import React, { useEffect, useState } from "react";
import { getMyPrescriptions } from "../../api/patientApi";
import { useNavigate } from "react-router-dom";

const MyPrescriptions = () => {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      const res = await getMyPrescriptions();

      // ✅ SORT: Latest prescription first
      const sorted = (res.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPrescriptions(sorted);
    } catch (err) {
      console.error(err);
      setError("Unable to load prescriptions");
    }
  };

  return (
    <div style={pageStyle}>
      {/* HEADER */}
      <div style={headerStyle}>
        <h2>My Prescriptions</h2>
        <button style={backBtn} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {prescriptions.length === 0 ? (
        <div style={emptyBox}>
          <h3>No Prescriptions Yet</h3>
          <p>Please consult a doctor to receive prescriptions.</p>
        </div>
      ) : (
        prescriptions.map((p) => (
          <div key={p.prescriptionId} style={cardStyle}>
            {/* TOP INFO */}
            <div style={topInfo}>
              <div>
                <b>Prescription ID:</b> #{p.prescriptionId}
              </div>

              <div>
                <b>Created On:</b>{" "}
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleDateString()
                  : "-"}
              </div>

              <div>
                <b>Appointment:</b>{" "}
                {p.appointmentDate
                  ? `${p.appointmentDate} at ${p.appointmentTime?.substring(0, 5)}`
                  : "-"}
              </div>

              <div>
                <b>Doctor:</b> {p.doctorName || "-"}
              </div>
            </div>

            {/* MEDICINES TABLE */}
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Medicine</th>
                  <th style={thStyle}>Dosage</th>
                  <th style={thStyle}>Duration</th>
                  <th style={thStyle}>Instructions</th>
                </tr>
              </thead>
              <tbody>
                {p.items && p.items.length > 0 ? (
                  p.items.map((m, index) => (
                    <tr key={m.id ?? `${p.prescriptionId}-${index}`}>
                      <td style={tdStyle}>{m.medicineName}</td>
                      <td style={tdStyle}>{m.dosage}</td>
                      <td style={tdStyle}>{m.duration || "-"}</td>
                      <td style={tdStyle}>{m.instructions || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                      No medicines
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPrescriptions;

/* ===================== STYLES ===================== */

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

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "25px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const topInfo = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginBottom: "15px",
  fontSize: "14px",
  gap: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
  background: "#f1f3f6",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const emptyBox = {
  background: "#ffffff",
  padding: "40px",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};
