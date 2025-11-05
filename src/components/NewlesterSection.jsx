import React, { useState } from "react"

function NewsletterSection() {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.includes("@") || !email.includes(".")) {
        alert("Por favor, ingresá un correo válido.")
        return
        }

        console.log("Email registrado:", email)
        setSubmitted(true)
        setEmail("")
    }

    return (
        <section className="newsletter-section bg-dark text-white py-5">
        <div className="container text-center">
            <h2 className="fw-bold mb-3">Recibí todas las novedades y ofertas</h2>
            <p className="text-light mb-4">
            Unite a nuestra comunidad y enterate antes que nadie de los nuevos lanzamientos de juegos argentinos
            </p>

            {submitted ? (
            <p className="text-success fw-bold">¡Gracias por suscribirte!</p>
            ) : (
            <form
                onSubmit={handleSubmit}
                className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2"
            >
                <input
                type="email"
                className="form-control w-75 w-sm-50 border-light"
                placeholder="Ingresá tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <button type="submit" className="btn btn-primary px-4">
                Suscribirme
                </button>
            </form>
            )}
        </div>
        </section>
    )
}

export default NewsletterSection
