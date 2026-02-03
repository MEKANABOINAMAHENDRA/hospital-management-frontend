import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNurse } from "../../api/adminApi";

export default function AdminAddNurse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNurse(form);
      alert("Nurse added successfully");
      navigate("/admin/nurses");
    } catch {
      alert("Failed to add nurse");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Nurse</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={e =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <br /><br />

        <button type="submit">Save Nurse</button>
        <button type="button" onClick={() => navigate("/admin/nurses")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
