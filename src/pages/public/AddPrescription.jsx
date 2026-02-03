import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  savePrescription,
  updatePrescription,
  getPrescriptionByAppointment
} from "../../api/doctorApi";

const AddPrescription = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const [diagnosis, setDiagnosis] = useState("");
  const [items, setItems] = useState([]);
  const [medicine, setMedicine] = useState({
    medicineName: "",
    dosage: "",
    duration: "",
    instructions: ""
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getPrescriptionByAppointment(appointmentId)
      .then(res => {
        if (!res.data) return;

        setDiagnosis(res.data.diagnosis || "");
        setItems(res.data.items || []);
        setIsEdit(true);
      })
      .catch(() => {
        setIsEdit(false);
        setDiagnosis("");
        setItems([]);
      });
  }, [appointmentId]);

  const addMedicine = () => {
    if (!medicine.medicineName) {
      alert("Enter medicine name");
      return;
    }

    setItems([...items, { ...medicine }]);

    setMedicine({
      medicineName: "",
      dosage: "",
      duration: "",
      instructions: ""
    });
  };

  const removeMedicine = index => {
    setItems(items.filter((_, i) => i !== index));
  };

  const save = async () => {
    if (items.length === 0) {
      alert("Add at least one medicine");
      return;
    }

    const payload = { diagnosis, items };

    try {
      if (isEdit) {
        await updatePrescription(appointmentId, payload);
        alert("Prescription Updated");
      } else {
        await savePrescription(appointmentId, payload);
        alert("Prescription Added");
      }

      navigate("/doctor/appointments");
    } catch (e) {
      alert("Error saving prescription");
    }
  };

  return (
    <div className="page">
      <h2>Add / Edit Prescription</h2>

      <input
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={e => setDiagnosis(e.target.value)}
      />

      <h4>Medicine</h4>

      <input
        placeholder="Medicine"
        value={medicine.medicineName}
        onChange={e =>
          setMedicine({ ...medicine, medicineName: e.target.value })
        }
      />
      <input
        placeholder="Dosage"
        value={medicine.dosage}
        onChange={e =>
          setMedicine({ ...medicine, dosage: e.target.value })
        }
      />
      <input
        placeholder="Duration"
        value={medicine.duration}
        onChange={e =>
          setMedicine({ ...medicine, duration: e.target.value })
        }
      />
      <input
        placeholder="Instructions"
        value={medicine.instructions}
        onChange={e =>
          setMedicine({ ...medicine, instructions: e.target.value })
        }
      />

      <button onClick={addMedicine}>+ Add Medicine</button>

      <ul>
        {items.map((m, i) => (
          <li key={i}>
            {m.medicineName} - {m.dosage} - {m.duration}
            <button onClick={() => removeMedicine(i)}>X</button>
          </li>
        ))}
      </ul>

      <button onClick={save}>Save</button>

      {/* ✅ NEW NAVIGATION BUTTONS */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/doctor/appointments")}>
          ⬅ Back to Appointments
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/doctor/dashboard")}
        >
          🏠 Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AddPrescription;
