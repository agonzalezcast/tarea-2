
import { librosIniciales } from './data/libros.js';

import Pagina from './componentes/layout/Pagina.jsx';
import Panel from './componentes/comunes/Panel.jsx';
import ListaLibros from './componentes/libros/ListaLibros.jsx';

function App() {
    const libros = librosIniciales;

    return (
        <Pagina>
            <Panel titulo="Libros del club">
                <p>
                    Consulta las lecturas propuestas por los miembros.
                </p>

                <ListaLibros libros={libros} />
            </Panel>
        </Pagina>
    );
}

export default App;
