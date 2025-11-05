import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../api/api";
import UserInfo from "../components/UserInfo";

function UserProfile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchUser(id);
                setUserData(data);
            } catch (err) {
                setError("No se pudo cargar la información del usuario.");
            } finally {
                setLoading(false);
            }
    };

    loadUser();
    }, [id]);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <UserInfo user={userData} />
        </div>
    );
}

export default UserProfile;