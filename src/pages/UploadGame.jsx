import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { ToastContainer, toast } from "react-toastify"  //Renderiza el contenedor donde aparecerán los toasts.
import "react-toastify/dist/ReactToastify.css"
import api, { fetchGames } from "../api/api"

export default function CrudGames() {
  const [games, setGames] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [price, setPrice] = useState("")
  const [editMode, setEditMode] = useState(false)  //Editando(true)/Creando(false)
  const [editId, setEditId] = useState(null)  //id del juego a editar, valor nulo en caso de no editar

  //Llama a cargarJuegos() para traer la lista desde la API al iniciar.
  useEffect(() => {
    cargarJuegos()
  }, [])

  const cargarJuegos = async () => {
    try {
      const data = await fetchGames()
      setGames(data)
    } catch (error) {
      console.error(error)
      toast.error("Error al cargar los juegos")
    }
  }

  const limpiarCampos = () => {   //Resetea los inputs y vuelve editMode/editId a su estado inicial.
    setTitle("")
    setDescription("")
    setGenre("")
    setPrice("")
    setEditMode(false)
    setEditId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !genre || !price) {  //Validacion de campos completos
      toast.warn("Todos los campos son obligatorios")
      return
    }

    const nuevoJuego = { title, description, genre, price: parseFloat(price) }

    try {
      if (editMode) {
        await api.put(`/games/${editId}`, nuevoJuego)
        toast.success("Juego actualizado correctamente")
      } else {
        await api.post("/games", nuevoJuego)
        toast.success("Juego agregado correctamente")
      }

      limpiarCampos()  //Resetea el formulario
      cargarJuegos()  //Recarga la lista para mostrar cambios en la tabla

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("modalGame")
      )
      modal.hide()
    } catch (error) {
      console.error(error)
      toast.error("Error al guardar el juego")
    }
  }

  const eliminarJuego = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este juego?")) {
      try {
        await api.delete(`/games/${id}`)
        toast.success("Juego eliminado correctamente")
        cargarJuegos()
      } catch (error) {
        console.error(error)
        toast.error("Error al eliminar el juego")
      }
    }
  }

  const editarJuego = (game) => {
    setTitle(game.title)
    setDescription(game.description)
    setGenre(game.genre)
    setPrice(game.price)
    setEditMode(true)
    setEditId(game.id)

    const modal = new window.bootstrap.Modal(document.getElementById("modalGame"))
    modal.show()
  }

  return (
    <div className="container mt-4 shadow-lg p-3 mb-5 bg-body rounded">
      {/* Toastify container */}
      <ToastContainer position="bottom-right" autoClose={2000} />

      <button
        id="btnCrear"
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalGame"
        onClick={limpiarCampos}
      >
        Agregar Juego
      </button>

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
                <td>{game.title}</td>
                <td>{game.description}</td>
                <td>{game.genre}</td>
                <td>${game.price}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarJuego(game)}
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

      {/* Modal */}
      <div
        className="modal fade"
        id="modalGame"
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h1 className="modal-title fs-5" id="modalLabel">
                {editMode ? "Editar Juego" : "Nuevo Juego"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">
                    Título:
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="col-form-label">
                    Descripción:
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="genre" className="col-form-label">
                    Género:
                  </label>
                  <input
                    id="genre"
                    type="text"
                    className="form-control"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="col-form-label">
                    Precio:
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
