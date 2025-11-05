// src/pages/UserProfile.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUser } from "../api/api";
import UserInfo from "../components/UserInfo";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // redirige a otro perfil según el ID o nombre
      navigate(`/users/${searchQuery}`);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        padding: "20px",
      }}
    >
      {/* Buscador de usuarios */}
      <div
        className="w-100 d-flex justify-content-center mb-4"
        style={{ maxWidth: "500px" }}
      >
        <form className="input-group" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar otro usuario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </form>
      </div>

      {/* Card con info del usuario */}
      <div
        className="cardprofile shadow-lg border-0 rounded-4 p-4 text-center"
        style={{
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 className="text-primary fw-bold mb-4">
          Perfil del Usuario {userData?.name}
        </h2>

        <UserInfo user={userData} />

        <button
          className="btn btn-outline-secondary mt-4"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
