import axios from "axios";

const API_URL = "http://localhost:8080";

// 🔑 auth helper
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* ================= PATIENT ================= */

export const getAllPatients = () =>
  axios.get(`${API_URL}/patient`, authHeader());

export const searchPatients = (keyword) =>
  axios.get(
    `${API_URL}/patient/search?keyword=${keyword}`,
    authHeader()
  );

/* ================= DOCTOR ================= */

export const getAllDoctors = () =>
  axios.get(`${API_URL}/doctor`, authHeader());

export const getDoctorById = (id) =>
  axios.get(`${API_URL}/doctor/${id}`, authHeader());

export const updateDoctorStatus = (id, available) =>
  axios.patch(                                                                                          
    `${API_URL}/doctor/${id}`,
    { available },
    authHeader()
  );

export const updateDoctor = (id, data) =>
  axios.put(`${API_URL}/doctor/${id}`, data, authHeader());

export const addDoctor = (data) =>
  axios.post(`${API_URL}/doctor/admin`, data, authHeader());


/* ================= APPOINTMENTS ================= */

export const getAllAppointments = () =>
  axios.get(`${API_URL}/appointment`, authHeader());

/* ================= DEPARTMENTS ================= */

export const getAllDepartments = () =>
  axios.get(`${API_URL}/department`, authHeader());

export const addDepartment = (data) =>
  axios.post(
    "http://localhost:8080/department",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );


/* ================= AUTH ================= */

export const registerUser = (data) =>
  axios.post(`${API_URL}/auth/register`, data);



/* ================= NURSE (USER BASED) ================= */

export const getAllNurses = () =>
  axios.get(`${API_URL}/users?role=NURSE`, authHeader());

export const getNurseById = (id) =>
  axios.get(`${API_URL}/users/${id}`, authHeader());

export const addNurse = (data) =>
  axios.post(
    `${API_URL}/auth/register`,
    {
      username: data.username,
      password: data.password,
      role: "NURSE"      
    },
    authHeader()
  );


export const updateNurse = (id, data) =>
  axios.put(`${API_URL}/users/${id}`, data, authHeader());

export const updateNurseStatus = (id, enabled) =>
  axios.patch(
    `${API_URL}/users/${id}/status?enabled=${enabled}`,
    {},
    authHeader()
  );


