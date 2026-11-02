export function validarLibro(datos) {
  const errores = {}

  if (datos.titulo.trim().length < 2) {
    errores.titulo = 'Escriba un título de al menos 2 caracteres.'
  }

  if (datos.autor.trim().length < 2) {
    errores.autor = 'El nombre del autor debe tener al menos 2 caracteres.'
  }

  if (datos.miembro === '') {
    errores.miembro = 'Indique quién propone el libro.'
  }

  return errores
}
