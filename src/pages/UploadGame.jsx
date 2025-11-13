import { useEffect, useState, useRef } from "react"
import { Modal } from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { fetchGames, fetchGenres, postGame, deleteGame, updateGame } from "../api/api"
import ModalCrear from "../components/ModalCrear"
import ModalEditar from "../components/ModalEditar"

export default function CrudGames() {
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [gameToEdit, setGameToEdit] = useState(null)
  const needsRefreshRef = useRef(false)

  const modalCrearRef = useRef(null)
  const modalEditarRef = useRef(null)

  // useEffect para cargar datos
  useEffect(() => {
    cargarJuegos()
    cargarGeneros()
  }, [])

  // useEffect para inicializar los modales
  useEffect(() => {
    if (modalCrearRef.current) {
      modalCrearRef.current.modalInstance = new Modal(modalCrearRef.current)
    }
    if (modalEditarRef.current) {
      modalEditarRef.current.modalInstance = new Modal(modalEditarRef.current)
    }
  }, [])

  // useEffect para manejar el cierre de modales
  useEffect(() => {
    const handleModalHide = (event) => {
      // Comprobamos la señal
      if (
        needsRefreshRef.current === "crear" ||
        needsRefreshRef.current === "editar"
      ) {
        // Toast
        if (needsRefreshRef.current === "crear") {
          toast.success("Juego agregado correctamente")
        } else if (needsRefreshRef.current === "editar") {
          toast.success("Juego actualizado correctamente")
        }

        limpiarCampos()
        cargarJuegos()

        // 3. Reseteamos la señal
        needsRefreshRef.current = false
      }
    }

    const modalCrearEl = modalCrearRef.current
    const modalEditarEl = modalEditarRef.current

    // Ocultar modales
    if (modalCrearEl) {
      modalCrearEl.addEventListener("hidden.bs.modal", handleModalHide)
    }
    if (modalEditarEl) {
      modalEditarEl.addEventListener("hidden.bs.modal", handleModalHide)
    }

    return () => {
      if (modalCrearEl) {
        modalCrearEl.removeEventListener("hidden.bs.modal", handleModalHide)
      }
      if (modalEditarEl) {
        modalEditarEl.removeEventListener("hidden.bs.modal", handleModalHide)
      }
    }
  }, []) // Se ejecuta 1 sola vez

  const cargarJuegos = async () => {
    try {
      const data = await fetchGames()
      setGames(data)
    } catch (error) {
      console.error(error)
      toast.error("Error al cargar los juegos")
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


  const limpiarCampos = () => {
    setGameToEdit(null)
  }

  const abrirModalCrear = () => {
    limpiarCampos()
  }

  // recibe el objeto 'nuevoJuego' del componente modal
  const handleCrear = async (nuevoJuego) => {
    try {
      await postGame(nuevoJuego)

      needsRefreshRef.current = "crear"

      // cerrar modal
      modalCrearRef.current?.modalInstance?.hide()
    } catch (error) {
      console.error(error)
      toast.error("Error al crear el juego")
    }
  }

  // recibe 'id' y 'juegoActualizado' del componente modal
  const handleEditar = async (id, juegoActualizado) => {
    try {
      await updateGame(id, juegoActualizado)

      needsRefreshRef.current = "editar"

      // cerrar modal
      modalEditarRef.current?.modalInstance?.hide()
    } catch (error) {
      console.error(error)
      toast.error("Error al actualizar el juego")
    }
  }

  const eliminarJuego = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este juego?")) {
      try {
        await deleteGame(id)
        toast.success("Juego eliminado correctamente")
        cargarJuegos()
      } catch (error) {
        console.error(error)
        toast.error("Error al eliminar el juego")
      }
    }
  }


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
        data-bs-toggle="modal"
        data-bs-target="#modalCrear"
        onClick={abrirModalCrear}
      >
        Agregar Juego
      </button>

      {/* Botón invisible para editar */}
      <button
        id="btnEditarHidden"
        type="button"
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#modalEditar"
      ></button>

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
          {games.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No hay juegos registrados
              </td>
            </tr>
          ) : (
            games.map((game) => (
              <tr key={game.id} className="text-center align-middle">
                <td>{game.id}</td>
                <td>{game.name}</td>
                <td>{game.description}</td>
                <td>
                  {game.genres && game.genres.length > 0
                    ? game.genres.map((g) => g.genre.name).join(", ")
                    : "—"}
                </td>
                <td>{game.is_free ? "Gratis" : `$${game.price}`}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      editarJuego(game) // Setea el estado
                      document.getElementById("btnEditarHidden")?.click() // Abre el modal
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


      <ModalCrear
        modalRef={modalCrearRef}
        genres={genres}
        onGameCreated={handleCrear}
      />

      <ModalEditar
        modalRef={modalEditarRef}
        genres={genres}
        currentGame={gameToEdit}
        onGameUpdated={handleEditar}
      />
    </div>
  )
}