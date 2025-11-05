import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import UserInfo from "../components/UserInfo"
import "bootstrap/dist/css/bootstrap.min.css"

function Profile() {
  const { userProfile, loading } = useAuth() || {}
  const [searchQuery, setSearchQuery] = useState("")
  const [searchedUser, setSearchedUser] = useState(null)


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-light">
        <div className="text-center">
          <h2 className="text-warning fw-bold">No has iniciado sesión</h2>
          <p className="text-secondary">
            Iniciá sesión para acceder a tu perfil.
          </p>
        </div>
      </div>
    )
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (
      userProfile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userProfile.email?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      setSearchedUser(userProfile)
    } else {
      setSearchedUser(null)
    }
  }

  return (
    <>
      {/* Card del perfil */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="cardprofile shadow-lg border-0 rounded-4 p-4 text-center bg-dark text-light"
          style={{
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h2 className="text-primary fw-bold mb-4">Tu Perfil</h2>

          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4 shadow"
            style={{
              width: "90px",
              height: "90px",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            {userProfile.username
              ? userProfile.username.charAt(0).toUpperCase()
              : "?"}
          </div>

          <UserInfo user={searchedUser || userProfile} />

          <button className="btn btn-primary mt-4 px-5 fw-semibold">
            Editar perfil
          </button>
        </div>
      </div>

      {/* Sección de búsqueda */}
      <div
        className="w-100 d-flex flex-column justify-content-center align-items-center my-5"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <h3 className="text-primary fw-bold mb-3">Buscar otros usuarios</h3>
        <p className="text-secondary mb-4 text-center">
          Ingresá el nombre o correo del usuario que quieras encontrar.
        </p>

        <form className="d-flex w-100 px-3" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2 border-secondary"
            placeholder="Buscar usuarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary fw-semibold" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </>
  )
}

export default Profile