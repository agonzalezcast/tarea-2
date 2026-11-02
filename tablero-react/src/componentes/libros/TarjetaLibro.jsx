
import { claseEstado } from '../../utils/libros.js'

function TarjetaLibro({ libro, onAvanzar, onQuitar }) {
    return (
        <article className="card h-100 tarjeta-libro">
            <div className="card-body d-flex flex-column">
                <span className={'badge align-self-start mb-2 ' + claseEstado(libro.estado)}>
                    {libro.estado}
                </span>
                <h3 className="h6 card-title">{libro.titulo}</h3>
                <p className="card-text small text-secondary mb-3">{libro.autor} · propuesto por {libro.propuestoPor}</p>
                <div className="mt-auto d-flex gap-2 flex-wrap">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => onAvanzar(libro.id)}>
                        Cambiar estado
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onQuitar(libro.id)}>
                        Quitar
                    </button>
                </div>
            </div>
        </article>
    )
}

export default TarjetaLibro
