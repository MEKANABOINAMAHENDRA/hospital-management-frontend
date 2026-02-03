import { NavLink } from "react-router-dom";
import "./../styles/nurse.css";

export default function NurseSidebar() {
  return (
    <aside className="sidebar">
      <h2>🧑‍⚕️ Nurse Panel</h2>

      <NavLink to="/nurse/dashboard">Dashboard</NavLink>
      <NavLink to="/nurse/add-patient">Add Patient</NavLink>
      <NavLink to="/nurse/book-appointment">Book Appointment</NavLink>
      <NavLink to="/nurse/notifications">Notifications</NavLink>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </aside>
  );
}
