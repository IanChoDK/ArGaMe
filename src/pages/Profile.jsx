import { useAuth } from "../context/AuthContext"

function Profile() {
    const { userProfile } = useAuth()

    if (!userProfile) return <p>No has iniciado sesión.</p>

    return (
        // Informacion de usuario
        <div className="profile">
        <h2>Perfil del Usuario</h2>
        <p>Nombre: {userProfile.name}</p>
        <p>Usuario: {userProfile.username}</p>
        <p>prueba: {userProfile.created_at}</p>
        <p>Email: {userProfile.email}</p>
        </div>
    )
}

export default Profile