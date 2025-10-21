import { useAuth } from "../context/AuthContext"

function Profile() {
    const { user } = useAuth()

    if (!user) return <p>No has iniciado sesión.</p>

    return (
        // Faltar poner info
        <div className="profile">
        <h2>Perfil del Usuario</h2>
        <p>Nombre: {user.name}</p>
        <p>Usuario: {user.username}</p>
        <p>prueba: {user.created_at}</p>
        <p>Email: {user.email}</p>
        </div>
    )
}

export default Profile