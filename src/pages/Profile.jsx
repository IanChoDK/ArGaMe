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
    e.preventDefault()    // Tu lógica de búsqueda...
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
    // Contenedor principal
    <div className="container mt-5" data-bs-theme="dark" >
      
      {/* Barra de búsqueda */}
      <div className="row mb-4">
        <div className="col-12 col-md-8 offset-md-2">
          <form className="d-flex w-100" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Encuentra nuevos usuarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Fila principal de contenido (2 columnas) */}
      <div className="row g-4">
        
        {/* --- COLUMNA IZQUIERDA (Perfil) --- */}
        <div className="col-12 col-md-4">
          
          {/* 👇 CAMBIO CLAVE AQUÍ 👇 */}
          {/* 1. Usamos la clase "card" de Bootstrap.
            2. Quitamos "cardprofile" para evitar el conflicto de CSS.
            3. "card" ya tiene flexbox, pero funciona con la grilla.
            4. Añadimos "text-center" para centrar el contenido.
          */}
          <div
            className="card shadow-lg border-0 rounded-4 p-4 text-center"
          >

            {/* ===== 🖼️ IMAGEN DE PERFIL AÑADIDA ===== */}
          <img
            // Reemplaza esto con la URL real, ej: userProfile.avatar
            src="https://i.pinimg.com/originals/2e/61/1f/2e611f47d51f71326a941f6ec3644724.jpg" 
            className="rounded-circle shadow-sm mx-auto d-block mb-3"
            alt="Foto de perfil"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover", // Evita que la imagen se estire
            }}
          />
          {/* ===== FIN DE LA IMAGEN ===== */}
            <h2 className="text-primary fw-bold mb-4">Tu Perfil</h2>

            <UserInfo user={searchedUser || userProfile} />

            <button className="btn btn-primary mt-4 px-5 fw-semibold">
              Editar perfil
            </button>
          </div>
        </div>

        {/* --- COLUMNA DERECHA (Contenido para rellenar) --- */}
        <div className="col-12 col-md-8">
          
          {/* Placeholder de "Juegos Favoritos" */}
          <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h4 className="mb-3">Juegos Favoritos</h4>
              <div className="row text-center">
                <div className="col-4">
                  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/298050/header.jpg?t=1708071557" className="img-fluid rounded shadow-sm" alt="Juego"/>
                  <h6 className="mt-2 small">Master of Orion</h6>
                </div>
                <div className="col-4">
                  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/689900/header.jpg?t=1728902158" className="img-fluid rounded shadow-sm" alt="Juego"/>
                  <h6 className="mt-2 small">Darkestville Castle</h6>
                </div>
                <div className="col-4">
                  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1670870/header.jpg?t=1686276552" className="img-fluid rounded shadow-sm" alt="Juego"/>
                  <h6 className="mt-2 small">MADiSON</h6>
                </div>
              </div>
            </div>
          </div>
          
          {/* Placeholder de "Actividad Reciente" */}
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h4 className="mb-3">Actividad Reciente</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-success me-3 p-2 rounded-circle">★</span>
                  Añadió <strong>Forager</strong> a su lista de deseados.
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-info me-3 p-2 rounded-circle">✎</span>
                  Escribió una reseña para <strong>MADiSON</strong>.
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <span className="badge bg-secondary me-3 p-2 rounded-circle">✓</span>
                  Completó el logro "Maestro" en <strong>Quantum League</strong>.
                </li>
              </ul>
            </div>
          </div>

        </div> {/* Fin Columna Derecha */}
      </div> {/* Fin Fila Principal */}
    </div> // Fin Contenedor
  );
}

export default Profile;