import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patientApi from "../../api/patientApi";

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phoneno: "",
    address: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing profile
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await patientApi.getMyProfile();
      setForm({
        phoneno: res.data.phoneno || "",
        address: res.data.address || ""
      });
    } catch (err) {
      setError("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientApi.updateMyProfile(form);
      setSuccess("Profile updated successfully");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError("Update failed");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px" }}>
      <h2>Edit Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneno"
            value={form.phoneno}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <button style={{ marginTop: "15px" }} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
