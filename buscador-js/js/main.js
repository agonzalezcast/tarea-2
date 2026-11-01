import { buscarLibros } from "./api.js";
import { mostrarCargando, mostrarError, mostrarVacio, mostrarResultados } from './render.js';
import './propuestas.js';

// ── Búsqueda (GET) ── 

const formBusqueda = document.getElementById('formBusqueda')
const campoBusqueda = document.getElementById('textoBusqueda')

formBusqueda.addEventListener('submit', async (event) => {
    event.preventDefault()
    const texto = campoBusqueda.value.trim()
    if (texto === '') return

    mostrarCargando();

    try{
        const libros = await buscarLibros(texto)

        console.log('Libros encontrados: ', libros)
        if (libros.length === 0){
            mostrarVacio();
        } else {
            mostrarResultados(libros);
        }
    } catch (error) {
        console.error(error);
        mostrarError();
    }
})