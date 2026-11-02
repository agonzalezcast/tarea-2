import TarjetaLibro from './TarjetaLibro.jsx';

function ListaLibros({ libros }) {
    return (
        <div className="lista-libros">
            {libros.map((libro) => (
                <TarjetaLibro
                    key={libro.id}
                    libro={libro}
                />
            ))}
        </div>
    );
}

export default ListaLibros;