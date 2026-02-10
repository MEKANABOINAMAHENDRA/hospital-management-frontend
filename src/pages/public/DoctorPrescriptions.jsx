import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorPrescriptions } from "../../api/doctorApi";
import jsPDF from "jspdf";
import "../../styles/departments.css";

const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctorPrescriptions()
      .then((res) => setPrescriptions(res.data || []))
      .catch(() => alert("403 - Login again"));
  }, []);

  const downloadPDF = (p) => {
    const pdf = new jsPDF();

    pdf.text(`Patient: ${p.patientName}`, 10, 10);
    pdf.text(`Diagnosis: ${p.diagnosis}`, 10, 20);

    let y = 30;
    p.items.forEach((m, i) => {
      pdf.text(
        `${i + 1}. ${m.medicineName} | ${m.dosage} | ${m.duration} | ${m.instructions}`,
        10,
        y
      );
      y += 10;
    });

    pdf.save(`Prescription-${p.appointmentId}.pdf`);
  };

  return (
    <div className="dp-page">
      <h2>My Prescriptions</h2>
      <button
  style={backBtn}
  onClick={() => navigate("/doctor/dashboard")}
>
  ← Back to Dashboard
</button>


      {prescriptions.map((p) => (
        <div key={p.appointmentId} className="dp-card">
          {/* HEADER */}
          <div className="dp-header">
            <p><b>Patient:</b> {p.patientName}</p>
            <p><b>Diagnosis:</b> {p.diagnosis}</p>
          </div>

          {/* TABLE */}
          {p.items.length === 0 ? (
            <p>No medicines</p>
          ) : (
            <table className="dp-table">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Duration</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                {p.items.map((m, i) => (
                  <tr key={i}>
                    <td>{m.medicineName}</td>
                    <td>{m.dosage}</td>
                    <td>{m.duration}</td>
                    <td>{m.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ACTIONS */}
          <div className="dp-actions">
            <button
              type="button"
              onClick={() =>
                navigate(`/doctor/add-prescription/${p.appointmentId}`)
              }
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => downloadPDF(p)}
            >
              Download PDF
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorPrescriptions;
