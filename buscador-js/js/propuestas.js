
const formPropuesta = document.getElementById('formPropuesta');
const contenedorAutores = document.getElementById('contenedorAutores');
const botonAgregarAutor = document.getElementById('agregarAutor');

const MAX_AUTORES = 5;
const MIN_AUTORES = 1;

// Actualizar los botones de eliminar autores
function actualizarAutores() {
    const campos = contenedorAutores.querySelectorAll('.campo-autor');

    campos.forEach((campo, indice) => {
        const input = campo.querySelector('input');
        const botonEliminar = campo.querySelector('.eliminar-autor');

        input.setAttribute('aria-label', 'Nombre del autor ' + (indice + 1));

        // No permitir eliminar el único autor
        if (botonEliminar) {
            botonEliminar.disabled = campos.length <= MIN_AUTORES;
        }
    });

    // Desactivar el botón cuando hay 5 autores
    botonAgregarAutor.disabled = campos.length >= MAX_AUTORES;
}

// Agregar un campo de autor
botonAgregarAutor.addEventListener('click', () => {
    const cantidadAutores =
        contenedorAutores.querySelectorAll('.campo-autor').length;

    if (cantidadAutores >= MAX_AUTORES) {
        return;
    }

    const campo = document.createElement('div');
    campo.className = 'campo-autor';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'autores[]';
    input.className = 'form-control';
    input.placeholder = 'Nombre del autor';
    input.required = true;

    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'btn btn-outline-danger btn-sm eliminar-autor';
    botonEliminar.textContent = 'Eliminar';

    campo.append(input, botonEliminar);
    contenedorAutores.append(campo);

    actualizarAutores();
});

// Eliminar un autor mediante delegación de eventos
contenedorAutores.addEventListener('click', (event) => {
    const boton = event.target.closest('.eliminar-autor');

    if (!boton || !contenedorAutores.contains(boton)) {
        return;
    }

    const cantidadAutores =
        contenedorAutores.querySelectorAll('.campo-autor').length;

    if (cantidadAutores <= MIN_AUTORES) {
        return;
    }

    boton.closest('.campo-autor').remove();

    actualizarAutores();
});

// Preparar el formulario para las validaciones del siguiente commit
formPropuesta.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log('Formulario de propuesta enviado');
});

actualizarAutores();
