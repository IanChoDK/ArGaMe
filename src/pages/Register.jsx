import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Register() {
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", username: "", password: "", role_id: 2 })

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await register(form)
        if (res.ok) navigate("/login")
    }

    return (
        <div className="container mt-5">
        <h2>Registro</h2>
        <form className="col-md-6 mx-auto" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input name="name" className="form-control" required value={form.name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input name="username" className="form-control" required value={form.username} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" type="email" className="form-control" required value={form.email} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input name="password" type="password" className="form-control" required value={form.password} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Rol</label>
                <select name="role_id" className="form-select" value={form.role_id} onChange={handleChange}>
                    <option value={1}>Admin</option>
                    <option value={2}>Usuario</option>
                    <option value={3}>Moderador</option>
                    {/* Hay que realizar el fetch de roles*/}
                </select>
            </div>

            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
        </div>
    )
}

export default Register
