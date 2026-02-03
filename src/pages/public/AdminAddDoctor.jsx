import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoctor, getAllDepartments } from "../../api/adminApi";

export default function AdminAddDoctor() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    specialization: "",
    phoneNo: "",
    experience: "",
    qualification: "",
    departmentId: ""
  });

  /* ================= LOAD DEPARTMENTS ================= */
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load departments");
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.departmentId) {
      alert("Please select department");
      return;
    }

    const payload = {
      username: form.username.trim(),
      password: form.password.trim(),
      name: form.name.trim(),
      specialization: form.specialization.trim(),
      phoneNo: form.phoneNo.trim(),        // ✅ EXACT DTO NAME
      experience: Number(form.experience), // ✅ MUST BE INTEGER
      qualification: form.qualification.trim(),
      departmentId: Number(form.departmentId)
    };

    try {
      await addDoctor(payload);
      alert("Doctor added successfully");
      navigate("/admin/doctors");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to add doctor");
    }
  };

  return (
    <div style={page}>
      <h2>Add Doctor</h2>

      <form onSubmit={handleSubmit} style={formBox}>
        <input placeholder="Username" required
          onChange={e => setForm({ ...form, username: e.target.value })} />

        <input type="password" placeholder="Password" required
          onChange={e => setForm({ ...form, password: e.target.value })} />

        <input placeholder="Doctor Name" required
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input placeholder="Specialization" required
          onChange={e => setForm({ ...form, specialization: e.target.value })} />

        <input placeholder="Phone Number" required
          onChange={e => setForm({ ...form, phoneNo: e.target.value })} />

        <input type="number" placeholder="Experience (years)" required
          onChange={e => setForm({ ...form, experience: e.target.value })} />

        <input placeholder="Qualification" required
          onChange={e => setForm({ ...form, qualification: e.target.value })} />

        <select required
          onChange={e => setForm({ ...form, departmentId: e.target.value })}>
          <option value="">-- Select Department --</option>
          {departments.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <button type="submit">Save Doctor</button>
        <button type="button" onClick={() => navigate("/admin/dashboard")}>
          Back
        </button>
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "30px",
  background: "#f4f6f8",
  minHeight: "100vh"
};

const formBox = {
  background: "#fff",
  padding: "25px",
  maxWidth: "400px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};
