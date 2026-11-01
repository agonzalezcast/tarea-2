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

    const celdaTitulo = document.createElement('td');
    celdaTitulo.textContent = libro.titulo;

    const celdaAutor = document.createElement('td');
    celdaAutor.textContent = libro.autores;

    const celdaEstado = document.createElement('td');
    celdaEstado.textContent = libro.estado;

    fila.append(celdaTitulo, celdaAutor, celdaEstado);

    return fila;
}

// Mostrar los libros seleccionados
function mostrarLista() {
    listaLecturas.replaceChildren(...librosSeleccionados.map(crearFila));
}