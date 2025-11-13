import { useState } from "react"
import { toast } from "react-toastify"


export default function ModalCrear({ modalRef, genres, onGameCreated }) {
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

    const limpiarFormulario = () => {
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
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !description || (!isFree && !price)) {
            toast.warn("Completá los campos obligatorios")
            return
        }

        const nuevoJuego = {
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

        // llama al handler del padre
        onGameCreated(nuevoJuego)
        // limpia el formulario internamente para la próxima vez
        limpiarFormulario()
    }

    return (
        <div
            ref={modalRef}
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

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {/* Título */}
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
        
                        {/* Descripción */}
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
        
                        {/* Precio */}
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
        
                        {/* Fecha de lanzamiento */}
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
        
                        {/* Thumbnail */}
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
        
                        {/* Es gratuito */}
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
        
                        {/* Géneros */}
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
                                        Array.from(e.target.selectedOptions, (option) =>
                                            Number(option.value)
                                        )
                                    )
                                }
                            >
                            {(genres || []).map((g) => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                            </select>
                            <small className="text-muted">
                                Mantén Ctrl (o Cmd) para seleccionar varios.
                            </small>
                        </div>
                        
                    {/* Developer ID */}
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
                        
                        {/* Editor ID */}
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
                        
                        {/* Publicado */}
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
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}