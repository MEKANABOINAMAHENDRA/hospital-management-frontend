import "../../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Hospital Management System</h1>

        <p>
          Manage appointments, prescriptions, billing, and medical records
          with our secure hospital portal.
        </p>

        <div className="home-buttons">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}
