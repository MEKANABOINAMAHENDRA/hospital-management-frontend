import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

/* ===== AUTH ===== */
import Login from "./login.jsx";
import Register from "./Register.jsx";

/* ===== PUBLIC ===== */
import Home from "./pages/public/Home";
import Departments from "./pages/public/Departments";

/* ===== ADMIN ===== */
import AdminDashboard from "./pages/public/AdminDashboard";
import AdminPatients from "./pages/public/AdminPatients";
import AdminDoctors from "./pages/public/AdminDoctors";
import AdminAppointments from "./pages/public/AdminAppointments";
import AdminAddDoctor from "./pages/public/AdminAddDoctor";
import AdminAddNurse from "./pages/public/AdminAddNurse";
import AdminEditNurse from "./pages/public/AdminEditNurse.jsx";
import AdminEditDoctor from "./pages/public/AdminEditDoctor";
import AdminNurses from "./pages/public/AdminNurses";
import AdminDepartments from "./pages/public/AdminDepartments";
import AdminAddDepartment from "./pages/public/AdminAddDepartment";

/* ===== NURSE ===== */
import NurseDashboard from "./pages/public/NurseDashboard.jsx";
import NurseBookAppointment from "./pages/public/NurseBookAppointment.jsx";
import NurseOnlineAppointments from "./pages/public/NurseOnlineAppointments.jsx";
import NurseTodayAppointments from "./pages/public/NurseTodayAppointments.jsx";

/* ===== PATIENT ===== */
import PatientDashboard from "./pages/public/PatientDashboard";
import PatientBookAppointment from "./pages/public/PatientBookAppointment";
import CreatePatientProfile from "./pages/public/CreatePatientProfile";
import EditProfile from "./pages/public/EditProfile";
import MyAppointments from "./pages/public/MyAppointments";
import MyBills from "./pages/public/MyBills";
import MyPrescriptions from "./pages/public/MyPrescriptions";

/* ===== DOCTOR ===== */
import DoctorDashboard from "./pages/public/DoctorDashboard";
import DoctorAppointments from "./pages/public/DoctorAppointments";
import DoctorPrescriptions from "./pages/public/DoctorPrescriptions";
import AddPrescription from "./pages/public/AddPrescription";

/* ===== SECURITY ===== */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <HashRouter>
      <div className="app-layout">
        <Navbar />

        <Routes>
          {/* ===== PUBLIC ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/departments" element={<Departments />} />

          {/* ===== PATIENT ===== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/create-profile"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <CreatePatientProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/book-appointment"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <PatientBookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/appointments"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/public/edit-profile"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bills"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <MyBills />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-prescriptions"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <MyPrescriptions />
              </ProtectedRoute>
            }
          />

          {/* ===== DOCTOR ===== */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/prescriptions"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <DoctorPrescriptions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/add-prescription/:appointmentId"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <AddPrescription />
              </ProtectedRoute>
            }
          />

          {/* ===== NURSE ===== */}
          <Route
            path="/nurse/dashboard"
            element={
              <ProtectedRoute allowedRoles={["NURSE"]}>
                <NurseDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nurse/book-appointment"
            element={
              <ProtectedRoute allowedRoles={["NURSE"]}>
                <NurseBookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nurse/requests"
            element={
              <ProtectedRoute allowedRoles={["NURSE"]}>
                <NurseOnlineAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nurse/today"
            element={
              <ProtectedRoute allowedRoles={["NURSE"]}>
                <NurseTodayAppointments />
              </ProtectedRoute>
            }
          />

          {/* ===== ADMIN ===== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/patients"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminPatients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDoctors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/nurses"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminNurses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-doctor"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminAddDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-doctor/:id"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminEditDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-nurse"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminAddNurse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-nurse/:id"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminEditNurse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/departments"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDepartments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-department"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminAddDepartment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/appointments"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminAppointments />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
