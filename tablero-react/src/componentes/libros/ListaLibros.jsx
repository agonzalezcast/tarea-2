import TarjetaLibro from './TarjetaLibro.jsx';

function ListaLibros({ libros, onCambiarEstado, onQuitar }) {
    if (libros.length === 0) {
        return (
            <div className="mensaje-vacio">
                No hay libros en el tablero.
            </div>
        );
    }
    
    return (
        
        <div className="lista-libros">
            {libros.map((libro) => (
                <TarjetaLibro key={libro.id} libro={libro} onCambiarEstado={onCambiarEstado} onQuitar={onQuitar}/>
            ))}
        </div>
    );
}

export default ListaLibros;