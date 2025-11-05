import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

function Register() {
    const { register, loading, error } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        role_id: 2,
    })

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await register(form)
        if (res.ok) navigate("/login")
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 text-light">
        <div
            className="p-4 rounded-4 shadow-lg"
        >
            <h2 className="text-center mb-4 fw-bold text-primary">
            Crear cuenta
            </h2>

            <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
                <label className="form-label">Nombre completo</label>
                <input
                name="name"
                className="form-control bg-dark text-light border-secondary"
                required
                value={form.name}
                onChange={handleChange}
                />
            </div>

            <div className="mb-3 text-start">
                <label className="form-label">Usuario</label>
                <input
                name="username"
                className="form-control bg-dark text-light border-secondary"
                required
                value={form.username}
                onChange={handleChange}
                />
            </div>

            <div className="mb-3 text-start">
                <label className="form-label">Email</label>
                <input
                name="email"
                type="email"
                className="form-control bg-dark text-light border-secondary"
                required
                value={form.email}
                onChange={handleChange}
                />
            </div>

            <div className="mb-3 text-start">
                <label className="form-label">Contraseña</label>
                <input
                name="password"
                type="password"
                className="form-control bg-dark text-light border-secondary"
                required
                value={form.password}
                onChange={handleChange}
                />
            </div>

            <div className="mb-4 text-start">
                <label className="form-label">Rol</label>
                <select
                name="role_id"
                className="form-select bg-dark text-light border-secondary"
                value={form.role_id}
                onChange={handleChange}
                >
                <option value={1}>Admin</option>
                <option value={2}>Usuario</option>
                <option value={3}>Moderador</option>
                </select>
            </div>

            <button
                className="btn btn-primary w-100 fw-bold"
                type="submit"
                disabled={loading}
            >
                {loading ? "Registrando..." : "Registrarse"}
            </button>

            {error && (
                <div className="alert alert-danger mt-3 text-center">
                {error}
                </div>
            )}

            <p className="mt-4 text-center">
                ¿Ya tenés cuenta?{" "}
                <Link to="/login" className="text-primary fw-semibold">
                Iniciá sesión
                </Link>
            </p>
            </form>
        </div>
        </div>
    )
}

export default Register