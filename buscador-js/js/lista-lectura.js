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

    const fila = crearFila(nuevoLibro);

    // Agregar la fila con su estado inicial
    fila.classList.add('libro-entrando');
    listaLecturas.append(fila);

    // Activar la transición cuando el navegador dibuje la fila
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            fila.classList.remove('libro-entrando');
        });
    });
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
    celdaAcciones.className = 'acciones-lectura';

    const botonEstado = document.createElement('button');
    botonEstado.type = 'button';
    botonEstado.className = 'btn btn-outline-primary btn-sm btn-cambiar';
    botonEstado.textContent = 'Cambiar estado';

    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'btn btn-outline-danger btn-sm btn-eliminar';
    botonEliminar.textContent = 'Eliminar';

    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'botones-lectura';

    contenedorBotones.append(botonEstado, botonEliminar);
    celdaAcciones.append(contenedorBotones);

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

    const libroActualizado = librosSeleccionados.find(
        (libro) => libro.key === key
    );

    const fila = Array.from(listaLecturas.children).find(
        (elemento) => elemento.dataset.key === key
    );

    if (!libroActualizado || !fila) {
        return;
    }

    const insignia = fila.querySelector('.badge');

    insignia.textContent = libroActualizado.estado;
    insignia.className =
        'badge ' + claseEstado(libroActualizado.estado);

    // Reiniciar y activar la animación
    insignia.classList.remove('estado-animado');
    void insignia.offsetWidth;
    insignia.classList.add('estado-animado');
}

// Eliminar un libro de la lista
function eliminarLibro(key) {
    const fila = Array.from(listaLecturas.children).find(
        (elemento) => elemento.dataset.key === key
    );

    if (!fila || fila.classList.contains('libro-saliendo')) {
        return;
    }

    // Actualizar el arreglo
    librosSeleccionados = librosSeleccionados.filter(
        (libro) => libro.key !== key
    );

    // Activar la transición de salida
    fila.classList.add('libro-saliendo');

    // Eliminar la fila cuando termina la transición
    fila.addEventListener('transitionend', (event) => {
        if (event.target === fila && event.propertyName === 'opacity') {
            fila.remove();
        }
    });
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