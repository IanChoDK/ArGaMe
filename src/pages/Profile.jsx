// src/pages/Profile.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserInfo from "../components/UserInfo";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { userProfile } = useAuth() || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  if (!userProfile) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-warning text-center shadow-sm">
          No has iniciado sesión.
        </div>
      </div>
    );
  }

  const handleSearch = (e) => {
    e.preventDefault();

    if (
      userProfile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userProfile.email?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      setSearchedUser(userProfile);
    } else {
      setSearchedUser(null);
    }
  };

  return (
    <>
      

      {/* Card del perfil */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="cardprofile shadow-lg border-0 rounded-4 p-4 text-center"
          style={{
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h2 className="text-primary fw-bold mb-4">Tu Perfil</h2>

          <UserInfo user={searchedUser || userProfile} />

          <button className="btn btn-primary mt-4 px-5 fw-semibold">
            Editar perfil
          </button>
        </div>
      </div>
      {/* Barra de búsqueda */}
      <div
        className="w-100 d-flex justify-content-center mb-3"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <form className="d-flex w-100" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Encuentra nuevos usuarios con los cuales interactuar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
