import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

function Login() {
    const { login, loading, error, user } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate("/profile")
    }, [user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 text-light">
        <div>
            <h2 className="text-center mb-4 fw-bold text-primary">
            Iniciar sesión
            </h2>

            <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
                <label className="form-label">Email</label>
                <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3 text-start">
                <label className="form-label">Contraseña</label>
                <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                className="btn btn-primary w-100 fw-bold"
                type="submit"
                disabled={loading}
            >
                {loading ? "Ingresando..." : "Entrar"}
            </button>

            {error && (
                <div className="alert alert-danger mt-3 text-center">
                {error}
                </div>
            )}

            <p className="mt-4 text-center">
                ¿No tenés cuenta?{" "}
                <Link to="/register" className="text-primary fw-semibold">
                Registrate acá
                </Link>
            </p>
            </form>
        </div>
        </div>
    )
}

export default Login