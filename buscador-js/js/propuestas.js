import { validarCampo, validarFormulario } from './validaciones.js';

const formPropuesta = document.getElementById('formPropuesta');
const contenedorAutores = document.getElementById('contenedorAutores');
const botonAgregarAutor = document.getElementById('agregarAutor');
const mensajePropuesta = document.getElementById('mensajePropuesta');

const MAX_AUTORES = 5;
const MIN_AUTORES = 1;

// Actualizar los campos de autores
function actualizarAutores() {
    const campos = contenedorAutores.querySelectorAll('.campo-autor');

    campos.forEach((campo, indice) => {
        const input = campo.querySelector('input');
        const botonEliminar = campo.querySelector('.eliminar-autor');

        input.setAttribute(
            'aria-label',
            'Nombre del autor ' + (indice + 1)
        );

        if (botonEliminar) {
            botonEliminar.disabled = campos.length <= MIN_AUTORES;
        }
    });

    botonAgregarAutor.disabled = campos.length >= MAX_AUTORES;
}

// Agregar un nuevo autor
botonAgregarAutor.addEventListener('click', () => {
    const cantidad = contenedorAutores.querySelectorAll('.campo-autor').length;

    if (cantidad >= MAX_AUTORES) {
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

    const contenidoAutor = document.createElement('div');
    contenidoAutor.className = 'contenido-autor';

    contenidoAutor.append(input);

    campo.append(contenidoAutor, botonEliminar);
    contenedorAutores.append(campo);

    actualizarAutores();
});

// Eliminar un autor
contenedorAutores.addEventListener('click', (event) => {
    const boton = event.target.closest('.eliminar-autor');

    if (!boton || !contenedorAutores.contains(boton)) {
        return;
    }

    const cantidad = contenedorAutores.querySelectorAll('.campo-autor').length;

    if (cantidad <= MIN_AUTORES) {
        return;
    }

    boton.closest('.campo-autor').remove();

    actualizarAutores();
});

// Mostrar mensajes con Bootstrap
function mostrarMensaje(texto, tipo) {
    const alerta = document.createElement('div');

    alerta.className = 'alert alert-' + tipo;
    alerta.setAttribute('role', 'alert');
    alerta.textContent = texto;

    mensajePropuesta.replaceChildren(alerta);
}

// Obtener los datos del formulario
function obtenerPropuesta() {
    const autores = Array.from(
        contenedorAutores.querySelectorAll('input')
    ).map((input) => input.value.trim());

    return {
        titulo: document.getElementById('tituloPropuesta').value.trim(),
        autores: autores,
        anio: Number(document.getElementById('anioPropuesta').value),
        paginas: Number(document.getElementById('paginasPropuesta').value),
        genero: document.getElementById('generoPropuesta').value,
        correo: document.getElementById('correoPropuesta').value.trim(),
        fecha: document.getElementById('fechaPropuesta').value,
        motivo: document.getElementById('motivoPropuesta').value.trim()
    };
}

// Limpiar el formulario después de un envío exitoso
function limpiarFormulario() {
    formPropuesta.reset();

    const camposAutores =
        contenedorAutores.querySelectorAll('.campo-autor');

    camposAutores.forEach((campo, indice) => {
        if (indice > 0) {
            campo.remove();
        }
    });

    const campos = formPropuesta.querySelectorAll(
        'input, select, textarea'
    );

    campos.forEach((campo) => {
        campo.setCustomValidity('');
        campo.classList.remove('is-invalid');
    });

    formPropuesta.querySelectorAll('.invalid-feedback')
        .forEach((mensaje) => mensaje.remove());

    actualizarAutores();
}

// Enviar la propuesta
formPropuesta.addEventListener('submit', async (event) => {
    event.preventDefault();

    mensajePropuesta.replaceChildren();

    // Validar antes de enviar
    if (!validarFormulario(formPropuesta)) {
        mostrarMensaje(
            'Revise los campos marcados antes de enviar.',
            'danger'
        );
        return;
    }

    const propuesta = obtenerPropuesta();
    const botonEnviar = formPropuesta.querySelector(
        'button[type="submit"]'
    );

    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Enviando...';

    try {
        const respuesta = await fetch(
            'https://jsonplaceholder.typicode.com/posts',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(propuesta)
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                'La API respondió con el código ' + respuesta.status
            );
        }

        const resultado = await respuesta.json();

        console.log('Respuesta de la API:', resultado);

        mostrarMensaje(
            'La propuesta se envió correctamente.',
            'success'
        );

        limpiarFormulario();

    } catch (error) {
        console.error('Error al enviar la propuesta:', error);

        mostrarMensaje(
            'No se pudo enviar la propuesta. Inténtelo nuevamente.',
            'danger'
        );
    } finally {
        botonEnviar.disabled = false;
        botonEnviar.textContent = 'Enviar propuesta';
    }
});

// Validar mientras se corrigen los campos
formPropuesta.addEventListener('input', (event) => {
    const campo = event.target;

    if (campo.matches('input, textarea')) {
        validarCampo(campo);
    }
});

formPropuesta.addEventListener('change', (event) => {
    const campo = event.target;

    if (campo.matches('select, input[type="date"]')) {
        validarCampo(campo);
    }
});

actualizarAutores();
