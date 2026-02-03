import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import patientApi from "../../api/patientApi";

const CreatePatientProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phoneno: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await patientApi.createProfile({
        name: form.name,
        age: Number(form.age),
        gender: form.gender,
        phoneno: form.phoneno,
        address: form.address,
      });

      // ✅ SUCCESS
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Profile creation failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create Patient Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="phoneno" placeholder="Phone" onChange={handleChange} />
        <textarea name="address" placeholder="Address" onChange={handleChange} />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default CreatePatientProfile;
