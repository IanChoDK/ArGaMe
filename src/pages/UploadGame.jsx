import { useEffect, useState, useRef } from "react"
import { Modal } from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { fetchGames, fetchGenres, postGame, deleteGame, updateGame } from "../api/api"

export default function CrudGames() {
  const [games, setGames] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [isFree, setIsFree] = useState(false)
  const [developerId, setDeveloperId] = useState("")
  const [editorId, setEditorId] = useState("")
  const [isPublished, setIsPublished] = useState(true)
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [editId, setEditId] = useState(null)
  const needsRefreshRef = useRef(false)
  
  const modalCrearRef = useRef(null)
  const modalEditarRef = useRef(null)

// useEffect para cargar datos (Este déjalo como está)
  useEffect(() => {
    cargarJuegos()
    cargarGeneros()
  }, [])

  // Arreglar backdrop y refresh al cerrar modales 
  useEffect(() => {
    
    const handleModalHide = (event) => {
      
      // Comprobamos la señal
      if (needsRefreshRef.current === "crear" || needsRefreshRef.current === "editar") {
        
        // Toast
        if (needsRefreshRef.current === "crear") {
          toast.success("Juego agregado correctamente")
        } else if (needsRefreshRef.current === "editar") {
          toast.success("Juego actualizado correctamente")
        }

        // 2. Limpiamos y recargamos
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
      modalCrearEl.addEventListener('hidden.bs.modal', handleModalHide)
    }
    if (modalEditarEl) {
      modalEditarEl.addEventListener('hidden.bs.modal', handleModalHide)
    }

    return () => {
      if (modalCrearEl) {
        modalCrearEl.removeEventListener('hidden.bs.modal', handleModalHide)
      }
      if (modalEditarEl) {
        modalEditarEl.removeEventListener('hidden.bs.modal', handleModalHide)
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
    setTitle("")
    setDescription("")
    setPrice("")
    setReleaseDate("")
    setThumbnail("")
    setIsFree(false)
    setDeveloperId("")
    setEditorId("")
    setIsPublished(true)
    setSelectedGenres([])
    setEditId(null)
  }

  const abrirModalCrear = () => {
    limpiarCampos()
  }

const handleCrear = async (e) => {
    e.preventDefault()
  
    if (!title || !description || (!isFree && !price)) {
      toast.warn("Completá los campos obligatorios")
      return
    }
  
    const nuevoJuego = {
      name: title, description,
      price: isFree ? 0 : parseFloat(price),
      release_date: releaseDate || new Date().toISOString().split("T")[0],
      thumbnail, is_free: isFree,
      developer_id: developerId || null,
      editor_id: editorId || null,
      is_published: isPublished,
      genres: selectedGenres,
    }
  
    try {
      await postGame(nuevoJuego)
      
      needsRefreshRef.current = "crear"

    } catch (error) {
      console.error(error)
      toast.error("Error al crear el juego")
    }
  }

  const handleEditar = async (e) => {
    e.preventDefault()
  
    if (!title || !description || (!isFree && !price)) {
      toast.warn("Completá los campos obligatorios")
      return
    }
  
    const juegoActualizado = {
      name: title, description,
      price: isFree ? 0 : parseFloat(price),
      release_date: releaseDate || new Date().toISOString().split("T")[0],
      thumbnail, is_free: isFree,
      developer_id: developerId || null,
      editor_id: editorId || null,
      is_published: isPublished,
      genres: selectedGenres,
    }
  
    try {
      await updateGame(editId, juegoActualizado)

      needsRefreshRef.current = "editar"

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
    setTitle(game.name)
    setDescription(game.description)
    setPrice(game.price)
    setReleaseDate(game.release_date?.split("T")[0] || "")
    setThumbnail(game.thumbnail || "")
    setIsFree(game.is_free)
    setDeveloperId(game.developer_id || "")
    setEditorId(game.editor_id || "")
    setIsPublished(game.is_published)
    setSelectedGenres(
      game.genres 
        ? game.genres.map((g) => g.genre_id) 
        : []
    )
    setEditId(game.id)
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
                      editarJuego(game)
                      document.getElementById("btnEditarHidden")?.click()
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

      {/* Modal Crear */}
      <div
        ref={modalCrearRef}
        className="modal fade"
        id="modalCrear"
        tabIndex="-1"
        aria-labelledby="modalCrearLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h1 className="modal-title fs-5" id="modalCrearLabel">
                Nuevo Juego
              </h1>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            
            <form onSubmit={handleCrear}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title-crear" className="col-form-label">
                    Título:
                  </label>
                  <input
                    id="title-crear"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description-crear" className="col-form-label">
                    Descripción:
                  </label>
                  <textarea
                    id="description-crear"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="price-crear" className="col-form-label">
                    Precio:
                  </label>
                  <input
                    id="price-crear"
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isFree}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="releaseDate-crear" className="col-form-label">
                    Fecha de lanzamiento:
                  </label>
                  <input
                    id="releaseDate-crear"
                    type="date"
                    className="form-control"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="thumbnail-crear" className="col-form-label">
                    URL de imagen (thumbnail):
                  </label>
                  <input
                    id="thumbnail-crear"
                    type="text"
                    className="form-control"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    id="isFree-crear"
                    type="checkbox"
                    className="form-check-input"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                  />
                  <label htmlFor="isFree-crear" className="form-check-label">
                    ¿Es gratuito?
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="genres-crear" className="col-form-label">
                    Géneros:
                  </label>
                  <select
                    id="genres-crear"
                    className="form-select"
                    multiple
                    size="6"
                    value={selectedGenres}
                    onChange={(e) =>
                      setSelectedGenres(
                        Array.from(e.target.selectedOptions, (option) => Number(option.value))
                      )
                    }
                  >
                    {(genres || []).map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <small className="text-muted">Mantén Ctrl (o Cmd) para seleccionar varios.</small>
                </div>

                <div className="mb-3">
                  <label htmlFor="developerId-crear" className="col-form-label">
                    ID del Desarrollador:
                  </label>
                  <input
                    id="developerId-crear"
                    type="number"
                    className="form-control"
                    value={developerId}
                    onChange={(e) => setDeveloperId(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="editorId-crear" className="col-form-label">
                    ID del Editor:
                  </label>
                  <input
                    id="editorId-crear"
                    type="number"
                    className="form-control"
                    value={editorId}
                    onChange={(e) => setEditorId(e.target.value)}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    id="isPublished-crear"
                    type="checkbox"
                    className="form-check-input"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <label htmlFor="isPublished-crear" className="form-check-label">
                    ¿Publicar juego?
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal" // <-- Este ya lo tiene
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal" // <--- AÑADE ESTO
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Editar */}
      <div
        ref={modalEditarRef}
        className="modal fade"
        id="modalEditar"
        tabIndex="-1"
        aria-labelledby="modalEditarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h1 className="modal-title fs-5" id="modalEditarLabel">
                Editar Juego
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            
            <form onSubmit={handleEditar}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title-editar" className="col-form-label">
                    Título:
                  </label>
                  <input
                    id="title-editar"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description-editar" className="col-form-label">
                    Descripción:
                  </label>
                  <textarea
                    id="description-editar"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="price-editar" className="col-form-label">
                    Precio:
                  </label>
                  <input
                    id="price-editar"
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isFree}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="releaseDate-editar" className="col-form-label">
                    Fecha de lanzamiento:
                  </label>
                  <input
                    id="releaseDate-editar"
                    type="date"
                    className="form-control"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="thumbnail-editar" className="col-form-label">
                    URL de imagen (thumbnail):
                  </label>
                  <input
                    id="thumbnail-editar"
                    type="text"
                    className="form-control"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    id="isFree-editar"
                    type="checkbox"
                    className="form-check-input"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                  />
                  <label htmlFor="isFree-editar" className="form-check-label">
                    ¿Es gratuito?
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="genres-editar" className="col-form-label">
                    Géneros:
                  </label>
                  <select
                    id="genres-editar"
                    className="form-select"
                    multiple
                    size="6"
                    value={selectedGenres}
                    onChange={(e) =>
                      setSelectedGenres(
                        Array.from(e.target.selectedOptions, (option) => Number(option.value))
                      )
                    }
                  >
                    {(genres || []).map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <small className="text-muted">Mantén Ctrl (o Cmd) para seleccionar varios.</small>
                </div>

                <div className="mb-3">
                  <label htmlFor="developerId-editar" className="col-form-label">
                    ID del Desarrollador:
                  </label>
                  <input
                    id="developerId-editar"
                    type="number"
                    className="form-control"
                    value={developerId}
                    onChange={(e) => setDeveloperId(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="editorId-editar" className="col-form-label">
                    ID del Editor:
                  </label>
                  <input
                    id="editorId-editar"
                    type="number"
                    className="form-control"
                    value={editorId}
                    onChange={(e) => setEditorId(e.target.value)}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    id="isPublished-editar"
                    type="checkbox"
                    className="form-check-input"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <label htmlFor="isPublished-editar" className="form-check-label">
                    ¿Publicar juego?
                  </label>
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
                <button
                  type="submit"
                  className="btn btn-warning"
                  data-bs-dismiss="modal" 
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}