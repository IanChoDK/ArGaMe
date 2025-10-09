import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login, loading, error, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        if (!error) navigate("/profile");
    };

    if (user)
        return (
        <div>
            <p>Ya estás logueado como {user.name}</p>
            <button onClick={() => navigate("/profile")}>Ir al perfil</button>
        </div>
        );

    return (
        <div className="login">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        </div>
    );
}

export default Login;
