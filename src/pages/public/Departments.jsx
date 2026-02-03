import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
import { getDepartments } from "../../api/departmentApi.js";

import "../../styles/departments.css";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      alert("Please login to view departments");
      navigate("/login");
      return;
    }

    getDepartments().then(setDepartments);
  }, []);

  return (
    <div className="dept-page">
      <h1>Our Departments</h1>

      <div className="dept-grid">
        {departments.map((dept) => (
          <div className="dept-card" key={dept.id}>
            <h3>{dept.name}</h3>
            <p>{dept.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
