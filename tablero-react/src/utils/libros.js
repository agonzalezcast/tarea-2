
import { ESTADOS } from '../data/libros.js'

// Pendiente → Leyendo → Leído → Pendiente
export function siguienteEstado(estado) {
  const posicion = ESTADOS.indexOf(estado)
  return ESTADOS[(posicion + 1) % ESTADOS.length]
}

// Pendiente → estado-pendiente
// Leyendo → estado-leyendo
// Leído → estado-leído
export function claseEstado(estado) {
  return 'estado-' + estado.toLowerCase().replace(' ', '-')
}
