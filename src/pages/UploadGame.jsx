import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { fetchGames, fetchGenres, postGame, deleteGame, updateGame } from "../api/api"

import ModalCrear from "../components/ModalCrear"
import ModalEditar from "../components/ModalEditar"



export default function CrudGames() {
  // Estados principales
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [gameToEdit, setGameToEdit] = useState(null)
  const [Loading, setLoading] = useState(false)

  const [showCrearModal, setShowCrearModal] = useState(false)
  const [showEditarModal, setShowEditarModal] = useState(false)
  
  const [needsRefresh, setNeedsRefresh] = useState(false)

  // useEffect para cargar datos
  useEffect(() => {
    cargarJuegos()
    cargarGeneros()
  }, [])

  // Cargar datos luego de crear o editar un juego
  useEffect(() => {
    
    if (needsRefresh && !showCrearModal && !showEditarModal) {
      
      // Si se cumplen las condiciones, recargamos
      cargarJuegos()
      
      setNeedsRefresh(false)
    }
    
  }, [needsRefresh, showCrearModal, showEditarModal])

  // Funciones para cargar datos
  const cargarJuegos = async () => { 
    setLoading(true)
    try {
      setGames([])

      const data = await fetchGames() 
      setGames(data) 
    } catch (error) { 
      console.error(error) 
      toast.error("Error al cargar los juegos") 
    }
    finally {
      setLoading(false)
    }  
  } 

  const cargarGeneros = async () => { 
    try { 
      const data = await fetchGenres() 
      setGenres(data || [])
    } catch (error) { 
      console.error("Error al cargar géneros:", error) 
      toast.error("Error al cargar los géneros")
      setGenres([])
    } 
  }

  // Limpiar campos de edición
  const limpiarCampos = () => {
    setGameToEdit(null)
  }

  // Handlers para crear, editar y eliminar juegos
  const handleCrear = async (nuevoJuego) => {
    try {
      await postGame(nuevoJuego)
      
      toast.success("Juego agregado correctamente")
      setNeedsRefresh(true)

      setShowCrearModal(false) // Cerramos el modal
      
    } catch (error) {
      console.error(error)
      toast.error("Error al crear el juego")
    }
  }

  const handleEditar = async (id, juegoActualizado) => {
    try {
      await updateGame(id, juegoActualizado)
      
      toast.success("Juego actualizado correctamente")
      // Refrescar pagina = true
      setNeedsRefresh(true)
      setShowEditarModal(false) // Cerrar modal
      limpiarCampos() 
      
    } catch (error) {
      console.error(error)
      toast.error("Error al actualizar el juego")
    }
  }

  // Funcion para eliminar un juego
  const eliminarJuego = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este juego?")) {
      setLoading(true)
      try {
        await deleteGame(id)
        toast.success("Juego eliminado correctamente")
        // Volver a cargar datos de juegos cuando se elimina uno
        cargarJuegos()
      } catch (error) {
        console.error(error)
        toast.error("Error al eliminar el juego")
        setLoading(false)
      }
    }
  }

  // Funcion para preparar la edición de un juego
  const editarJuego = (game) => {
    setGameToEdit(game)
  }

return (
    <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
      {/* Botón para crear juego */}
      <button
        id="btnCrear"
        type="button"
        className="btn btn-primary"
        onClick={() => setShowCrearModal(true)}
      >
        Agregar Juego
      </button>

      {Loading ? (
        // Spinner de carga
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "300px" }}>
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
          </div>
          <p className="mt-2 text-black">Cargando Juegos...</p>
        </div>
      ) : (
        // Tabla con datos de juegos
        <table className="table mt-3 table-bordered table-striped">
          <thead style={{ backgroundColor: "#0a4f70", color: "white" }}>
            <tr className="text-center">
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Género</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Verificar que haya juegos */}
            {games.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay juegos registrados
                </td>
              </tr>
            ) : (
              // Mapear y mostrar datos de cada juego
              games.map((game) => (
                <tr key={game.id} className="text-center align-middle">
                  <td>{game.id}</td>
                  <td>{game.name}</td>
                  <td>{game.description}</td>
                  <td>
                    {/* Mostrar géneros separados por comas */}
                    {game.genres && game.genres.length > 0
                      ? game.genres.map((g) => g.genre.name).join(", ")
                      : "—"}
                  </td>
                  <td>{game.is_free ? "Gratis" : `$${game.price}`}</td>
                  <td>
                    {/* Botones de editar y eliminar */}
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        editarJuego(game)
                        setShowEditarModal(true)
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarJuego(game.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      
      {/* Modales para crear y editar juegos */}
      <ModalCrear
        show={showCrearModal}
        onHide={() => setShowCrearModal(false)}
        genres={genres}
        onGameCreated={handleCrear}
      />

      <ModalEditar
        show={showEditarModal}
        onHide={() => {
          setShowEditarModal(false)
          limpiarCampos()
        }}
        genres={genres}
        currentGame={gameToEdit}
        onGameUpdated={handleEditar}
      />
    </div>
  )
}