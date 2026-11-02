function TarjetaLibro({ libro, onCambiarEstado, onQuitar }) {
    return (
        <article className="tarjeta-libro">
            <h3>{libro.titulo}</h3>

            <p>
                <strong>Autor:</strong> {libro.autor}
            </p>

            <p>
                <strong>Estado:</strong> {libro.estado}
            </p>

            <p>
                <strong>Propuesto por:</strong> {libro.propuestoPor}
            </p>

            <div className="acciones-libro">
                <button type="button" onClick={() => onCambiarEstado(libro.id)}>
                    Cambiar estado
                </button>

                <button type="button" onClick={() => onQuitar(libro.id)}>
                    Eliminar
                </button>
            </div>
        </article>
    );
}

export default TarjetaLibro;