import { useOrdenes } from "../context/Ordencontext";
import { Link } from "react-router-dom";

function OrdenCard({orden}) {
    const { deleteOrden } = useOrdenes();

  return (
    <div className="container-orden" >
        <div className="orden">
            <div className="orden-header">
                <h2>{orden.title}</h2>
                <button className="btn-delete" onClick={() => deleteOrden(orden._id)}>Eliminar</button> 
                <Link className="btn-edit" to={`/ordenes/${orden._id}
                `}>Editar</Link>
            </div>

            <p>{orden.descripcion}</p>
            <p>{orden.date}</p>
            <p>{orden.type}</p>
            <p>{orden.priority}</p>
        </div>
    </div>
  )
}

export default OrdenCard
