function Footer() {
    return (
    <footer className="bg-dark text-light text-center py-4 mt-auto">
        <div className="container">
        <h5 className="fw-bold mb-1">ArGaMe</h5>

        <p className="mb-2 small text-secondary">
            © 2025 ArGaMe. Todos los derechos reservados.  
            Todas las marcas registradas pertenecen a sus respectivos dueños en Argentina y otros países.  
            Todos los precios incluyen IVA (donde sea aplicable).  
            <a href="#" className="text-light text-decoration-none mx-1">Reembolsos</a> | 
            <a href="#" className="text-light text-decoration-none mx-1">Cookies</a>
        </p>

        <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
            <span className="fw-semibold">Contactos:</span>

            <a
            href="mailto:argamemarket@gmail.com"
            className="text-light text-decoration-none"
            >
            Email: argamemarket@gmail.com
            </a>

            <span>|</span>

            <a
            href="https://www.facebook.com/people/Argame/61583377739895/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light text-decoration-none"
            >
            Facebook: Argame 
            </a>

            <span>|</span>

            <a
            href="https://www.instagram.com/argameoficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light text-decoration-none"
            >
            Youtube: @ArGaMeOficial
            </a>

            <span>|</span>

            <a
            href="https://www.instagram.com/argameoficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light text-decoration-none"
            >
            Instagram: @argameoficial
            </a>
        </div>
        </div>
    </footer>
    )
}

export default Footer
