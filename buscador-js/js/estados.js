
export const ESTADOS = ['Pendiente', 'Leyendo', 'Leído'];

// Pendiente → Leyendo → Leído → Pendiente
export function siguienteEstado(estado) {
    const posicion = ESTADOS.indexOf(estado);
    return ESTADOS[(posicion + 1) % ESTADOS.length];
}

// Clase CSS para representar el estado
export function claseEstado(estado) {
    return 'estado-' + estado.toLowerCase().replace(' ', '-');
}
