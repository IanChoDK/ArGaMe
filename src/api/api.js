import axios from "axios"

const SERVER_URL = "http://localhost:5000/"
const API_BASE = SERVER_URL

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir token si existe
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

//endpoints

//login
export async function loginAPI(email, password) {
  const res = await api.post("/login", { email, password });
  return res.data;
}

//registro, default rol user
export async function registerAPI({ name, email, password, username, role_id = 2 }) {
  const res = await api.post("/register", { name, email, password, username, role_id });
  return res.data;
}

//juegos
export async function fetchGames() {
  const res = await api.get("/games");
  return res.data;
}

//detalle de juegos
export async function fetchGame(id) {
  const res = await api.get(`/games/${id}`);
  return res.data;
}

//obtener usuarios
export async function fetchUsers() {
  const res = await api.get("/users");
  return res.data;
}

export default api;