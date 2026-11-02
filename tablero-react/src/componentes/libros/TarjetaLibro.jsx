function TarjetaLibro({ libro }) {
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
                <button type="button" disabled>
                    Cambiar estado
                </button>

                <button type="button" disabled>
                    Eliminar
                </button>
            </div>
        </article>
    );
}

export default TarjetaLibro;