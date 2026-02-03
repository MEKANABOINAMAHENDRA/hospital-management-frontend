import axios from "axios";

const API_URL = "http://localhost:8080";

const getToken = () => localStorage.getItem("token");

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

/* ================= PROFILE ================= */

// 🔹 GET LOGGED-IN PATIENT PROFILE
const getMyProfile = () =>
  axios.get(`${API_URL}/patient/me`, authHeader());

// 🔹 CREATE PROFILE (FIRST TIME LOGIN)
const createProfile = (data) =>
  axios.post(`${API_URL}/patient/create-profile`, data, authHeader());

// 🔹 UPDATE PROFILE
const updateMyProfile = (data) =>
  axios.patch(`${API_URL}/patient/me`, data, authHeader());

/* ================= APPOINTMENTS ================= */

// 🔹 GET DOCTORS
const getDoctors = () =>
  axios.get(`${API_URL}/doctor`, authHeader());

// 🔹 BOOK APPOINTMENT (ONLINE PATIENT)
const bookAppointment = (data) =>
  axios.post(`${API_URL}/appointment`, data, authHeader());

// 🔹 MY APPOINTMENTS
const getMyAppointments = () =>
  axios.get(`${API_URL}/appointment/my`, authHeader());

/* ================= PRESCRIPTION / BILL ================= */

const getMyPrescriptions = () =>
  axios.get(`${API_URL}/prescription/my`, authHeader());

const getMyBills = () =>
  axios.get(`${API_URL}/bill/my`, authHeader());

/* ================= EXPORT ================= */



const patientApi = {
  getMyProfile,
  createProfile,
  updateMyProfile,
};

export {
  getDoctors,
  bookAppointment,
  getMyAppointments,
  getMyPrescriptions,
  getMyBills,
};

export default patientApi;
