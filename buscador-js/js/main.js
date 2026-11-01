import { buscarLibros } from "./api.js";

// ── Búsqueda (GET) ── 

const formBusqueda = document.getElementById('formBusqueda')
const campoBusqueda = document.getElementById('textoBusqueda')
const mensajeBusqueda = document.getElementById('mensajeBusqueda')

formBusqueda.addEventListener('submit', async (event) => {
    event.preventDefault()
    const texto = campoBusqueda.value.trim()
    if (texto === '') return

    mensajeBusqueda.textContent = 'Buscando libros...';

    try{
        const libros = await buscarLibros(texto)

        console.log('Libros encontrados: ', libros)
        if (libros.length === 0){
            mensajeBusqueda.textContent = 'No se encontraron libros';
        } else {
            mensajeBusqueda.textContent = 'Se encotraron ' + libros.length + ' libros.';
        }
    } catch (error) {
        console.error(error);
        mensajeBusqueda.textContent = 'No se pudo completar la búsqueda. Revise su conexión e intente de nuevo.';
    }
})