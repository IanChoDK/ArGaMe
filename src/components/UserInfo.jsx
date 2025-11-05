function UserInfo({ user }) {
    if (!user) return <p>No se encontró información del usuario.</p>;

    return (
        <div className="profile">
            <h2>Perfil de {user.username}</h2>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Fecha de creación:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
    );
}

export default UserInfo;