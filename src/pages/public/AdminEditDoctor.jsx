import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAllDepartments,
  updateDoctor,
  getDoctorById
} from "../../api/adminApi";

export default function AdminEditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phoneNo: "",
    experience: "",
    qualification: "",
    available: true,
    departmentId: ""
  });

  useEffect(() => {
    loadDoctor();
    loadDepartments();
  }, []);

  const loadDoctor = async () => {
  try {
    const res = await getDoctorById(id);
    const d = res.data;

    setForm({
      name: d.name,
      specialization: d.specialization,
      phoneNo: d.phoneNo || "",
      experience: d.experience,
      qualification: d.qualification,
      available: d.available,
      departmentId: d.departmentId   // ✅ FIXED
    });
  } catch (err) {
    console.error("Load doctor error:", err);
    alert("Failed to load doctor details");
  }
};


  const loadDepartments = async () => {
    const res = await getAllDepartments();
    setDepartments(res.data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDoctor(id, {
        ...form,
        experience: Number(form.experience),
        departmentId: Number(form.departmentId)
      });

      alert("Doctor updated successfully");
      navigate("/admin/doctors");
    } catch (err) {
      console.error(err);
      alert("Failed to update doctor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Doctor</h2>

      <input
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        placeholder="Doctor Name"
        required
      />

      <input
        value={form.specialization}
        onChange={e => setForm({ ...form, specialization: e.target.value })}
        placeholder="Specialization"
        required
      />

      <input
        value={form.phoneNo}
        onChange={e => setForm({ ...form, phoneNo: e.target.value })}
        placeholder="Phone"
      />

      <input
        type="number"
        value={form.experience}
        onChange={e => setForm({ ...form, experience: e.target.value })}
        placeholder="Experience"
        required
      />

      <input
        value={form.qualification}
        onChange={e => setForm({ ...form, qualification: e.target.value })}
        placeholder="Qualification"
        required
      />

      <select
        value={form.departmentId}
        onChange={e => setForm({ ...form, departmentId: e.target.value })}
        required
      >
        <option value="">Select Department</option>
        {departments.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <select
        value={form.available}
        onChange={e =>
          setForm({ ...form, available: e.target.value === "true" })
        }
      >
        <option value="true">ACTIVE</option>
        <option value="false">DISABLED</option>
      </select>

      <button type="submit">Update Doctor</button>
      <button type="button" onClick={() => navigate("/admin/doctors")}>
        Cancel
      </button>
    </form>
  );
}
