import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { Modal } from 'bootstrap'

export default function ModalEditar({ show, onHide, genres, currentGame, onGameUpdated }) {
  // Estado interno del formulario
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [isFree, setIsFree] = useState(false)
  const [developerId, setDeveloperId] = useState("")
  const [editorId, setEditorId] = useState("")
  const [isPublished, setIsPublished] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [editId, setEditId] = useState(null)

  // Refs para el modal
  const modalRef = useRef(null)
  const modalInstance = useRef(null)

  // Efecto para inicializar el modal de Bootstrap
  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current, {
        keyboard: false,
        backdrop: 'static'
      })
    }
  }, [])

  // Efecto para mostrar/ocultar el modal cuando la prop 'show' cambia
  useEffect(() => {
    if (modalInstance.current) {
      if (show) {
        modalInstance.current.show()
      } else {
        modalInstance.current.hide()
      }
    }
  }, [show])

  // Efecto para escuchar el evento de cierre de Bootstrap
  useEffect(() => {
    const modalElement = modalRef.current
    if (!modalElement) return

    const handleHide = () => {
      onHide()
    }

    modalElement.addEventListener('hidden.bs.modal', handleHide)

    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleHide)
    }
  }, [onHide])
  
  // Efecto para sincronizar el estado interno cuando 'currentGame' cambia
  useEffect(() => {
    if (currentGame) {
      setTitle(currentGame.name || "")
      setDescription(currentGame.description || "")
      setPrice(currentGame.price || "")
      setReleaseDate(currentGame.release_date?.split("T")[0] || "")
      setThumbnail(currentGame.thumbnail || "")
      setIsFree(currentGame.is_free || false)
      setDeveloperId(currentGame.developer_id || "")
      setEditorId(currentGame.editor_id || "")
      setIsPublished(currentGame.is_published ?? true)
      setSelectedGenres(
        currentGame.genres ? currentGame.genres.map((g) => g.genre_id) : []
      )
      setEditId(currentGame.id)
    }
  }, [currentGame])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !description || (!isFree && !price)) {
      toast.warn("Completá los campos obligatorios")
      return
    }

    const juegoActualizado = {
      name: title,
      description,
      price: isFree ? 0 : parseFloat(price),
      release_date: releaseDate || new Date().toISOString().split("T")[0],
      thumbnail,
      is_free: isFree,
      developer_id: developerId || null,
      editor_id: editorId || null,
      is_published: isPublished,
      genres: selectedGenres,
    }

    if (editId) {
      onGameUpdated(editId, juegoActualizado)
    }
  }

  return (
    <div
      ref={modalRef}
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

          {/* Formulario de edicion de juego */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              {/* Título del juego */}
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

              {/* Descripción del juego */}
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

              {/* Precio del juego */}
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

              {/* Fecha de lanzamiento del juego */}
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

              {/* Imagen del juego */}
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

              {/* Es gratis */}
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

              {/* Selección de géneros */}
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
                  {/* Opciones de géneros */}
                  {(genres || []).map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
                <small className="text-muted">Mantén Ctrl (o Cmd) para seleccionar varios.</small>
              </div>

              {/* Id de desarrollador */}
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

              {/* Id de editor */}
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

              {/* Esta publicado */}
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
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}