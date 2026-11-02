
export function validarCampo(campo) {
    // Limpiar el mensaje personalizado anterior
    campo.setCustomValidity('');

    const valor = campo.value.trim();
    const anioActual = new Date().getFullYear();

    const hoy = new Date();
    const fechaActual = [
        hoy.getFullYear(),
        String(hoy.getMonth() + 1).padStart(2, '0'),
        String(hoy.getDate()).padStart(2, '0')
    ].join('-');

    // Campos obligatorios
    if (valor === '') {
        campo.setCustomValidity('Este campo es obligatorio.');
    }

    // Correo electrónico
    else if (campo.type === 'email' && campo.validity.typeMismatch) {
        campo.setCustomValidity('Ingrese un correo electrónico válido.');
    }

    // Año de publicación
    else if (campo.id === 'anioPropuesta') {
        const anio = Number(valor);

        if (!Number.isInteger(anio) || anio < 1 || anio > anioActual) {
            campo.setCustomValidity(
                'Ingrese un año entre 1 y ' + anioActual + '.'
            );
        }
    }

    // Número de páginas
    else if (campo.id === 'paginasPropuesta') {
        const paginas = Number(valor);

        if (!Number.isInteger(paginas) || paginas < 1) {
            campo.setCustomValidity(
                'Ingrese un número entero de páginas mayor que cero.'
            );
        }
    }

    // Fecha de la sesión
    else if (campo.id === 'fechaPropuesta') {
        if (valor < fechaActual) {
            campo.setCustomValidity(
                'La fecha de la sesión no puede ser anterior a hoy.'
            );
        }
    }

    // Comprobar si el campo es válido
    const esValido = campo.checkValidity();

    campo.classList.toggle('is-invalid', !esValido);

    // Buscar o crear el mensaje debajo del campo
    let mensaje = campo.nextElementSibling;

    if (!mensaje || !mensaje.classList.contains('invalid-feedback')) {
        mensaje = document.createElement('div');
        mensaje.className = 'invalid-feedback';
        campo.insertAdjacentElement('afterend', mensaje);
    }

    mensaje.textContent = campo.validationMessage;

    return esValido;
}

// Validar todos los campos del formulario
export function validarFormulario(formulario) {
    const campos = formulario.querySelectorAll(
        'input, select, textarea'
    );

    let esValido = true;

    campos.forEach((campo) => {
        if (!validarCampo(campo)) {
            esValido = false;
        }
    });

    return esValido;
}
