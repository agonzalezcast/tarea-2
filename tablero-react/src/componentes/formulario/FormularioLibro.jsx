import { useState } from 'react'
import { MIEMBROS } from '../../data/libros.js'
import { validarLibro } from '../../utils/validarLibro.js'

const VACIO = { titulo: '', autor: '', miembro: '' }

function FormularioLibro({ onAgregar }) {
    const [datos, setDatos] = useState(VACIO)
    const [errores, setErrores] = useState({})

    function cambiar(event) {
        const { name, value } = event.target
        setDatos({ ...datos, [name]: value })
    }

    function enviar(event) {
        event.preventDefault()
        const nuevosErrores = validarLibro(datos)
        setErrores(nuevosErrores)

        if (Object.keys(nuevosErrores).length > 0) {
            return
        }

        onAgregar({...datos, titulo: datos.titulo.trim(), autor: datos.autor.trim()})
        setDatos(VACIO)
    }

    return (
        <form onSubmit={enviar} noValidate>
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Título</label>
                <input
                    id="titulo"
                    name="titulo"
                    className={errores.titulo ? 'form-control is-invalid' : 'form-control'}
                    value={datos.titulo}
                    onChange={cambiar}
                />
                {errores.titulo && <div className="invalid-feedback">{errores.titulo}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="autor" className="form-label">Autor</label>
                <input
                    id="autor"
                    name="autor"
                    className={errores.autor ? 'form-control is-invalid' : 'form-control'}
                    value={datos.autor}
                    onChange={cambiar}>
                </input>
                {errores.autor && <div className="invalid-feedback">{errores.autor}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="miembro" className="form-label">Propuesta por</label>
                <select id="miembro" name="miembro" className={errores.miembro ? 'form-select is-invalid' : 'form-select'}
                    value={datos.miembro} onChange={cambiar}>
                    <option value="">Elija…</option>
                    {MIEMBROS.map((opcion) => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                </select>
                {errores.miembro && <div className="invalid-feedback">{errores.miembro}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Agregar libro</button>
        </form>
    )
}

export default FormularioLibro