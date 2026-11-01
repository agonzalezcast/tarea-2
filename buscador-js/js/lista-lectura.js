import { siguienteEstado, claseEstado } from './estados.js';

const listaLecturas = document.getElementById('listaLecturas');


// Arreglo para guardar los libros
let librosSeleccionados = [];

// Agregar un libro a la lista
export function agregarLibro(libro) {

    // Verificar si el libro ya está agregado
    const existe = librosSeleccionados.some(
        (item) => item.key === libro.key
    );

    if (existe) {
        alert('Este libro ya está en tu lista de lectura.');
        return;
    }

    // Crear el objeto que guardaremos en la lista
    const nuevoLibro = {
        key: libro.key,
        titulo: libro.title,
        autores: libro.author_name && libro.author_name.length > 0 ? libro.author_name.join(', ') : 'Autor desconocido',
        estado: 'Pendiente'
    };

    librosSeleccionados.push(nuevoLibro);

    mostrarLista()
}

// Crear una fila de la tabla
function crearFila(libro) {
    const fila = document.createElement('tr');
    fila.dataset.key = libro.key;

    const celdaTitulo = document.createElement('td');
    celdaTitulo.textContent = libro.titulo;

    const celdaAutor = document.createElement('td');
    celdaAutor.textContent = libro.autores;

    // Selector de estado
    const celdaEstado = document.createElement('td');

    const insignia = document.createElement('span');
    insignia.className = 'badge ' + claseEstado(libro.estado);
    insignia.textContent = libro.estado;

    celdaEstado.append(insignia);

    // Acciones
    const celdaAcciones = document.createElement('td');

    const botonEstado = document.createElement('button');
    botonEstado.type = 'button';
    botonEstado.className = 'btn btn-outline-primary btn-sm me-2 btn-cambiar';
    botonEstado.textContent = 'Cambiar estado';

    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'btn btn-outline-danger btn-sm btn-eliminar';
    botonEliminar.textContent = 'Eliminar';

    celdaAcciones.append(botonEstado, botonEliminar);

    fila.append(celdaTitulo, celdaAutor, celdaEstado, celdaAcciones);

    return fila;
}

// Mostrar los libros seleccionados
function mostrarLista() {
    listaLecturas.replaceChildren(...librosSeleccionados.map(crearFila));
}

// Cambiar el estado de un libro
function cambiarEstado(key) {
    librosSeleccionados = librosSeleccionados.map((libro) =>
        libro.key === key ? { ...libro, estado: siguienteEstado(libro.estado) } : libro
    );

    mostrarLista();
}

// Eliminar un libro de la lista
function eliminarLibro(key) {
    librosSeleccionados = librosSeleccionados.filter(
        (libro) => libro.key !== key
    );

    mostrarLista();
}

// Delegación de eventos
listaLecturas.addEventListener('click', (event) => {
    const boton = event.target.closest('.btn-cambiar, .btn-eliminar');

    if (!boton || !listaLecturas.contains(boton)) {
        return;
    }

    const fila = boton.closest('tr');
    const key = fila.dataset.key;

    if (boton.classList.contains('btn-cambiar')) {
        cambiarEstado(key);
    } else if (boton.classList.contains('btn-eliminar')) {
        eliminarLibro(key);
    }
});