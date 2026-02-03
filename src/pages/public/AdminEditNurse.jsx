import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNurseById, updateNurse } from "../../api/adminApi";

export default function AdminEditNurse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  useEffect(() => {
    loadNurse();
  }, []);

  const loadNurse = async () => {
    try {
      const res = await getNurseById(id);
      setUsername(res.data.username);
    } catch {
      alert("Failed to load nurse details");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateNurse(id, { username });
      alert("Nurse updated successfully");
      navigate("/admin/nurses");
    } catch {
      alert("Failed to update nurse");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Edit Nurse</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />

        <br /><br />

        <button type="submit">Update Nurse</button>
        <button type="button" onClick={() => navigate("/admin/nurses")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
