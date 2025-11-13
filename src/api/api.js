import axios from "axios"

const SERVER_URL = "http://localhost:5000/"
const API_BASE = SERVER_URL

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para incluir token si existe
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token")
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

//endpoints

//login
export async function loginAPI(email, password) {
  const res = await api.post("/login", { email, password })
  return res.data
}

//registro, default rol user
export async function registerAPI({ name, email, password, username, role_id = 2 }) {
  const res = await api.post("/register", { name, email, password, username, role_id })
  return res.data
}

//traer juegos 
export async function fetchGames() {
  const res = await api.get("/games")
  return res.data
}

//crear juego (admin)
export async function postGame(gameData){
  const res = await api.post("/games", gameData)
  return res.data
}

//detalle de juegos
export async function fetchGame(id) {
  const res = await api.get(`/games/${id}`)
  return res.data
}

//desactivar un juego (admin)
export async function deleteGame(id){
  const res = await api.delete(`/games/${id}`)
  return res.data
}

//obtener usuarios
export async function fetchUsers() {
  const res = await api.get("/users")
  return res.data
}

//obtener informacion de usuario detallado (admin,user)
export async function fetchUser(id){
  const res = await api.get(`/users/${id}`)
  return res.data
}

//modificar un usuario (admin)
export async function updateUser(id, userData){
  const res = await api.put(`/users/${id}`, userData)
  return res.data
}

//borrar un usuario (admin)
export async function deleteUser(id){
  const res = await api.delete(`/users/${id}`)
  return res.data
}

//biblioteca de juegos de un usuario
export async function fetchUserGames(id){
  const res = await api.get(`/users/${id}/games`)
  return res.data
}


//obtener review especifica
export async function fetchReview(id){
  const res = await api.get(`/reviews/${id}`)
  return res.data
}

//obtener reviews por juego
export async function fetchReviewForGame(id){
  const res = await api.get(`/games/${id}/reviews`)
  return res.data
}

// Crear review para un juego específico
export async function postReview(id, reviewData) {
  const res = await api.post(`/games/${id}/reviews`, reviewData);
  return res.data;
}

//desactivar review (admin, moderator, user)
export async function deleteReview(id){
  const res = await api.delete(`/reviews/${id}`)
  return res.data
}


//obtener generos
export async function fetchGenres(){
  const res = await api.get('/genres')
  return res.data
}

//modificar un genero (admin, moderator)
export async function updateGenre(id, genreData) {
  const res = await api.put(`/genres/${id}`, genreData);
  return res.data
}

//agregar genero (admin, moderador)
export async function postGenre(genreData){
  const res = await api.post('/genres', genreData)
  return res.data
}

//desactivar genero (admin)
export async function deleteGenre(id){
  const res = await api.delete(`/genres/${id}`)
  return res.data
}

//roles de usuarios
export async function fetchRoles(){
  const res = await api.get('/roles')
  return res.data
}

export default api