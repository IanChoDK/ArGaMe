import React from "react"

function FormsSection() {
    return (
        <section className="forms-section py-5 text-white">
        <div className="container">
            <h2 className="text-center mb-5">Participá y ayudanos a mejorar</h2>

            <div className="row">
            <div className="col-md-6 mb-4">
                <div className="form text-white h-100">
                <div className="form-body">
                    <h4 className="card-title text-center mb-3">📢 Reporte de Problemas</h4>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScmHOKMgRqsjmYh4_972tRW3u1BPDj2yjGw2zlBvtXIOSADyg/viewform?embedded=true" 
                    width="100%" 
                    height="400" 
                    frameBorder="0" 
                    marginHeight="0" 
                    marginWidth="0">Cargando…</iframe>
                </div>
                </div>
            </div>

            <div className="col-md-6 mb-4">
                <div className="form text-white h-100">
                <div className="form-body">
                    <h4 className="card-title text-center mb-3">💼 ¿Querés formar parte del equipo?</h4>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdcWalpueaUCs-yBdsH6zF6xxGj3UzxmDD0SmaB7inXNOQ8dQ/viewform?embedded=true" 
                    width="100%" 
                    height="400" 
                    frameborder="0" 
                    marginheight="0" 
                    marginwidth="0">Cargando…</iframe>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}

export default FormsSection
