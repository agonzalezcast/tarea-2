
import { useState } from 'react'
import { ESTADOS, librosIniciales } from './data/libros.js'
import { siguienteEstado } from './utils/libros.js'

import Pagina from './componentes/layout/Pagina.jsx'
import Panel from './componentes/comunes/Panel.jsx'
import ListaLibros from './componentes/libros/ListaLibros.jsx'
import ResumenLibros from './componentes/resumen/ResumenLibros.jsx'
import FiltrosLibros from './componentes/filtros/FiltrosLibros.jsx'
import FormularioLibro from './componentes/formulario/FormularioLibro.jsx'

function App() {
  const [libros, setLibros] = useState(librosIniciales)

  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [filtroMiembro, setFiltroMiembro] = useState('Todos')

  // Libros que cumplen ambos filtros
  const visibles = libros.filter(
    (libro) =>
      (filtroEstado === 'Todos' || libro.estado === filtroEstado) &&
      (filtroMiembro === 'Todos' || libro.propuestoPor === filtroMiembro)
  )

  // Cantidad de libros por estado
  const conteos = ESTADOS.map((estado) => ({
    estado: estado,
    cantidad: libros.filter((libro) => libro.estado === estado).length,
  }))


  function agregar(datos) {
    const nuevo = { ...datos, id: Date.now(), estado: 'Pendiente', propuestoPor: datos.miembro }
    setLibros([...libros, nuevo])
  }

  // Cambiar al siguiente estado
  function avanzar(id) {
    const nuevos = libros.map((libro) =>
      libro.id === id ? { ...libro, estado: siguienteEstado(libro.estado) } : libro)

    setLibros(nuevos)
  }

  // Eliminar un libro
  function quitar(id) {
    const nuevos = libros.filter((libro) => libro.id !== id)
    setLibros(nuevos)
  }

  return (
    <Pagina>
      <div className="row g-4">
        <div className="col-lg-8">
          <Panel titulo="Filtros">
            <FiltrosLibros
              estado={filtroEstado}
              miembro={filtroMiembro}
              onCambiarEstado={setFiltroEstado}
              onCambiarMiembro={setFiltroMiembro}
            />
          </Panel>

          <Panel titulo={`Libros del club (${visibles.length})`}>
            <ListaLibros libros={visibles} onAvanzar={avanzar} onQuitar={quitar} />
          </Panel>
        </div>

        <div className="col-lg-4">
          <Panel titulo="Resumen">
            <ResumenLibros conteos={conteos} />
          </Panel>
          <Panel titulo="Agregar un Libro">
            <FormularioLibro onAgregar={agregar} />
          </Panel>
        </div>
      </div>
    </Pagina>
  )
}

export default App
