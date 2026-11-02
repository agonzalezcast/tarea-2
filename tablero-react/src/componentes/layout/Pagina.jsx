function Pagina({ children }) {
    return (
        <>
            <header className="encabezado">
                <div className="contenedor">
                    <h1>Estantería Común</h1>
                    <p>Tablero de lecturas compartidas</p>
                </div>
            </header>

            <main className="contenedor">
                {children}
            </main>

            <footer className="pie-pagina">
                <p>Estantería Común - Tablero React</p>
            </footer>
        </>
    );
}

export default Pagina;