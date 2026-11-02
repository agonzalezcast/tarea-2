
import Encabezado from './Encabezado.jsx'

function Pagina({ children }) {
  return (
    <>
      <Encabezado />
      <main className="container pb-5">
        {children}
      </main>
    </>
  )
}

export default Pagina
