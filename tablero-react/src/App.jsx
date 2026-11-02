
import { useState } from 'react';
import { librosIniciales } from './data/libros.js';

import Pagina from './componentes/layout/Pagina.jsx';
import Panel from './componentes/comunes/Panel.jsx';
import ListaLibros from './componentes/libros/ListaLibros.jsx';

function App() {
  const [libros, setLibros] = useState(librosIniciales);

  function cambiarEstado(id) {
    setLibros((librosActuales) =>
      librosActuales.map((libro) => {
        if (libro.id !== id) {
          return libro;
        }

        let nuevoEstado;

        if (libro.estado === 'Pendiente') {
          nuevoEstado = 'Leyendo';
        } else if (libro.estado === 'Leyendo') {
          nuevoEstado = 'Leído';
        } else {
          nuevoEstado = 'Pendiente';
        }

        return {...libro,estado: nuevoEstado};
      })
    );
  }

  function quitarLibro(id) {
    setLibros((librosActuales) =>
      librosActuales.filter((libro) => libro.id !== id)
    );
  }

  return (
    <Pagina>
      <Panel titulo="Libros del club">
        <p>
          Consulta las lecturas propuestas por los miembros.
        </p>

        <ListaLibros libros={libros} onCambiarEstado={cambiarEstado} onQuitar={quitarLibro}/>
      </Panel>
    </Pagina>
  );
}

export default App;
