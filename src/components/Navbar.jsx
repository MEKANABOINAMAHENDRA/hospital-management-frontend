import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      {/* LOGO */}
      <h3 style={{ color: "#fff", margin: 0 }}>🏥 HospitalCare</h3>

      {/* LINKS */}
      <div style={menuStyle}>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/departments">Departments</Link>

        {/* PATIENT DASHBOARD */}
        {role === "ROLE_PATIENT" && (
          <button
            style={dashboardBtn}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        )}

        {/* DOCTOR DASHBOARD */}
        {role === "ROLE_DOCTOR" && (
          <button
            style={dashboardBtn}
            onClick={() => navigate("/doctor/dashboard")}
          >
            Dashboard
          </button>
        )}

        {/* NOT LOGGED IN */}
        {!token && (
          <>
            <button
              style={loginBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              style={registerBtn}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}

        {/* LOGGED IN */}
        {token && (
          <button style={logoutBtn} onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

/* ===================== STYLES ===================== */

const navStyle = {
  background: "#0d6efd",
  padding: "14px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const menuStyle = {
  display: "flex",
  gap: "14px",
  alignItems: "center",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

const dashboardBtn = {
  background: "#ffffff",
  color: "#0d6efd",
  border: "none",
  padding: "7px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const loginBtn = {
  background: "#198754",
  color: "#fff",
  border: "none",
  padding: "7px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const registerBtn = {
  background: "#ffc107",
  color: "#000",
  border: "none",
  padding: "7px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

const logoutBtn = {
  background: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "7px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};
