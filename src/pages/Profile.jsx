// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";
import UserInfo from "../components/UserInfo";

function Profile() {
    const { userProfile } = useAuth();

    if (!userProfile) return <p>No has iniciado sesión.</p>;

    return (
        <div>
            <h1>Tu Perfil</h1>
            <UserInfo user={userProfile} />
        </div>
    );
}

export default Profile;