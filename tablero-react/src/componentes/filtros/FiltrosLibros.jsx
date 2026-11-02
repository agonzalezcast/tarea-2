
import { ESTADOS, MIEMBROS } from '../../data/libros.js'

function FiltrosLibros({ estado, miembro, onCambiarEstado, onCambiarMiembro }) {
    return (
        <div className="row g-3">
            <div className="col-sm-6">
                <label htmlFor="filtro-estado" className="form-label">Estado</label>

                <select
                    id="filtro-estado"
                    className="form-select"
                    value={estado}
                    onChange={(event) => onCambiarEstado(event.target.value)}
                >
                    <option value="Todos">Todos</option>
                    {ESTADOS.map((opcion) => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                </select>
            </div>

            <div className="col-sm-6">
                <label htmlFor="filtro-miembro" className="form-label">Propuesto por</label>
                <select
                    id="filtro-miembro"
                    className="form-select"
                    value={miembro}
                    onChange={(event) => onCambiarMiembro(event.target.value)}
                >
                    <option value="Todos">Todos</option>
                    {MIEMBROS.map((opcion) => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default FiltrosLibros
