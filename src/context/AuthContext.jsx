import { createContext, useContext, useState } from "react"
import { loginAPI } from "../api/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function login(email, password) {
    setLoading(true)
    setError("")
    try {
      const userData = await loginAPI(email, password);
      setUser(userData)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)
}