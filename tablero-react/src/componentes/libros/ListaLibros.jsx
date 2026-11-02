
import TarjetaLibro from './TarjetaLibro.jsx'

function ListaLibros({ libros, onAvanzar, onQuitar }) {
    if (libros.length === 0) {
        return (
            <div className="alert alert-info mb-0">
                Ningún libro coincide con los filtros.
            </div>
        )
    }

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {libros.map((libro) => (
                <div className="col" key={libro.id}>
                    <TarjetaLibro libro={libro} onAvanzar={onAvanzar} onQuitar={onQuitar}/>
                </div>
            ))}
        </div>
    )
}

export default ListaLibros
