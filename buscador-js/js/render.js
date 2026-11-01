const zonaResultados = document.getElementById('resultados')
const mensajeBusqueda = document.getElementById('mensajeBusqueda')

// Crea un elemento con una clase y, si se indica, un texto 
function crear(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta)
    if (clase) elemento.className = clase
    if (texto) elemento.textContent = texto
    return elemento
}

//Crear tarjeta por libro
function crearTarjeta(libro) {

    const tarjeta = crear('article', 'card tarjeta-libro')

    // Portada
    const portada = crear('img', 'portada-libro')

    if (libro.cover_i) {
        portada.src = 'https://covers.openlibrary.org/b/id/' + libro.cover_i + '-M.jpg';
    } else {
        portada.src = './img/sin-imagen.svg';
    }

    portada.alt = 'Portada de ' + libro.title;

    // Información del libro
    const contenido = crear('div', 'card-body contenido-libro');

    const titulo = crear('h3', 'card-title titulo-libro', libro.title);

    const autores = libro.author_name && libro.author_name.length > 0 ? libro.author_name.join(', ') : 'Autor desconocido';

    const autor = crear('p', 'card-text autor-libro', autores);

    const anio = libro.first_publish_year ? libro.first_publish_year : 'Año desconocido';

    const publicacion = crear('p', 'card-text', 'Primera publicación: ' + anio);

    const acciones = crear('div', 'acciones-libro');

    const botonDetalles = crear('button', 'btn btn-primary', 'Ver detalles');

    botonDetalles.type = 'button';

    botonDetalles.addEventListener('click', () => {
        mostrarDetalles(libro);
    });

    acciones.append(botonDetalles);
    contenido.append(titulo, autor, publicacion, acciones);
    tarjeta.append(portada, contenido);

    return tarjeta;
}

function mostrarDetalles(libro){
    const contenidoModal = document.getElementById('modalLibroContenido');
    const tituloModal = document.getElementById('modalLibroTitulo');

    tituloModal.textContent = libro.title;

    const portada = crear('img', 'img-fluid rounded mb-3');

    if (libro.cover_i) {
        portada.src = 'https://covers.openlibrary.org/b/id/' + libro.cover_i + '-M.jpg';
    } else {
        portada.src = './img/sin-imagen.svg';
    }

    portada.alt = 'Portada de ' + libro.title;


    //Autores
    const autores = libro.author_name && libro.author_name.length > 0 ? libro.author_name.join(', ') : 'Autor desconocido';

    const autor = crear('p', '', 'Autores: '+ autores);

    //Año
    const anio = libro.first_publish_year ? libro.first_publish_year : 'Año desconocido';

    const publicacion = crear('p', '', 'Primera publicación: ' + anio);

    //Ediciones
    const ediciones = libro.edition_count ? libro.edition_count : 'No disponible';

    const cantidadEdiciones = crear('p', '', 'Cantidad de ediciones: ' + ediciones);

    //Idiomas
    const idiomas = libro.language && libro.language.length > 0 ? libro.language.join(', ') : 'No disponible';

    const idioma = crear('p', '', 'Idiomas: ' + idiomas);

    contenidoModal.replaceChildren(portada, autor, publicacion, cantidadEdiciones, idioma);


    // Abrir el modal de Bootstrap
    const elementoModal = document.getElementById('modalLibro');
    const modal = bootstrap.Modal.getOrCreateInstance(elementoModal);

    modal.show();
}

// Estado: cargando
export function mostrarCargando() {
    mensajeBusqueda.textContent = 'Buscando libros...';

    const cargando = crear('div', 'spinner-border text-primary');
    cargando.setAttribute('role', 'status');
    cargando.setAttribute('aria-label', 'Cargando resultados');

    zonaResultados.replaceChildren(cargando);
}

// Estado: error
export function mostrarError() {
    mensajeBusqueda.textContent = '';

    const alerta = crear(
        'div',
        'alert alert-danger',
        'No se pudo completar la búsqueda. Inténtalo nuevamente.'
    );

    zonaResultados.replaceChildren(alerta);
}

// Estado: sin resultados
export function mostrarVacio() {
    mensajeBusqueda.textContent = '';

    const alerta = crear(
        'div',
        'alert alert-info',
        'No se encontraron libros para esta búsqueda.'
    );

    zonaResultados.replaceChildren(alerta);
}

// Estado: resultados encontrados
export function mostrarResultados(libros) {
    mensajeBusqueda.textContent = 'Se encontraron ' + libros.length + ' libros.';

    zonaResultados.replaceChildren(...libros.map(crearTarjeta));
}