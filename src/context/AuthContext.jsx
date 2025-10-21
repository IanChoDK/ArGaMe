import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { loginAPI, registerAPI } from "../api/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken)

        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded)
          setToken(storedToken)
        } else {
          localStorage.removeItem("token")
        }
      } catch (error) {
        console.error("token invalido:", error)
        localStorage.removeItem("token")
      }
    }
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError("")
    try {
      const res = await loginAPI(email, password)
      const token = res.access_token
      if (!token) throw new Error("no se recibio token desde la api")

      localStorage.setItem("token", token)
      const decoded = jwtDecode(token)
      setUser(decoded)
      setToken(token)

      setLoading(false)

      return { ok: true }
    } catch (err) {
      console.error("Login error:", err)
      const msg = err.response?.data?.message || err.message || "Error en login"
      setError(msg)
      setLoading(false)
      return { ok: false, error: msg }
    }
  };

  const register = async ({ name, email, password, username, role_id = 2 }) => {
    setLoading(true)
    setError("")
    try {
      await registerAPI({ name, email, password, username, role_id })
      setLoading(false)
      return { ok: true }
    } catch (err) {
      console.error("Register error:", err)
      const msg = err.response?.data?.message || err.message || "Error en registro"
      setError(msg)
      setLoading(false)
      return { ok: false, error: msg }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)