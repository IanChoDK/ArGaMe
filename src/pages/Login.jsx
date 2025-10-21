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
        const res = await login(email, password)
        if (res.ok) {
        // login sin errores
        } else {
        // aca mostrar alerta
        }
    }

    return (
        <div className="login text-center">
            <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Entrar"}
                    </button>

                    <p className="mt-3 text-center">
                        ¿No tenés cuenta? <Link to="/register">Registrate aca</Link>
                    </p>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
        </div>
    )
}

export default Login

