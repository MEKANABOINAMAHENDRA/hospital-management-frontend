import axios from "axios";

const API_URL = "https://hospital-management-backend-h0fo.onrender.com";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const getDoctorProfile = () =>
  axios.get(`${API_URL}/doctor/me`, authHeader());

export const getDoctorAppointments = () =>
  axios.get(`${API_URL}/appointment/doctor/my`, authHeader());

export const getDoctorPrescriptions = () =>
  axios.get(`${API_URL}/prescription/doctor/my`, authHeader());

export const getPrescriptionByAppointment = (id) =>
  axios.get(
    `${API_URL}/prescription/appointment/${id}`,
    authHeader()
  );

export const savePrescription = (appointmentId, data) =>
  axios.post(
    `${API_URL}/prescription/${appointmentId}`,
    data,
    authHeader()
  );

export const updatePrescription = (appointmentId, data) =>
  axios.put(
    `${API_URL}/prescription/${appointmentId}`,
    data,
    authHeader()
  );

/* ================= NEW (ONLY THIS) ================= */

// ✅ DOCTOR / NURSE: MARK APPOINTMENT COMPLETED
export const completeAppointment = (id) =>
  axios.patch(
    `${API_URL}/appointment/complete/${id}`,
    {},
    authHeader()
  );
