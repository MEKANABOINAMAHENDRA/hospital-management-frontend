import axios from "axios";

const BASE_URL = "http://localhost:8080";
const token = () => localStorage.getItem("token");

const auth = {
  headers: { Authorization: `Bearer ${token()}` },
};

/* ================= OFFLINE PATIENT (NURSE) ================= */
// ✅ CORRECT ENDPOINT
export const addPatient = (data) =>
  axios.post(`${BASE_URL}/patient/offline`, data, auth);

/* ================= OFFLINE APPOINTMENT ================= */
export const bookOfflineAppointment = (data) =>
  axios.post(`${BASE_URL}/appointment/offline`, data, auth);

/* ================= ONLINE REQUESTS ================= */
export const getOnlineRequests = () =>
  axios.get(`${BASE_URL}/appointment/pending`, auth);

/* ================= APPROVE / REJECT ================= */
export const approveAppointment = (id) =>
  axios.patch(`${BASE_URL}/appointment/approve/${id}`, {}, auth);

export const rejectAppointment = (id) =>
  axios.patch(`${BASE_URL}/appointment/reject/${id}`, {}, auth);

/* ================= TODAY ================= */
export const getTodayAppointments = () =>
  axios.get(`${BASE_URL}/appointment/today`, auth);

/* ================= SEARCH PATIENT ================= */
// ✅ QUERY PARAM (matches backend)
export const searchPatientByPhone = (phone) =>
  axios.get(`${BASE_URL}/patient/search`, {
    params: { phone },
    ...auth,
  });

/* ================= DOCTORS ================= */
export const getAllDoctors = () =>
  axios.get(`${BASE_URL}/doctor`, auth);

/* ================= LAST APPOINTMENT ================= */
export const getLastAppointment = (patientId) =>
  axios.get(`${BASE_URL}/appointment/last/${patientId}`, auth);

/* ================= COMPLETE ================= */
export const completeAppointment = (id) =>
  axios.patch(`${BASE_URL}/appointment/complete/${id}`, {}, auth);
