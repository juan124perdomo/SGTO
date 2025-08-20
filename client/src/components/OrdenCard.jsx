import { useOrdenes } from "../context/Ordencontext";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "../style/Ordenes.css";

import '../style/OrdenCard.css';


function OrdenCard({orden}) {
    const { deleteOrden } = useOrdenes();

    useEffect(() => {
document.body.style.backgroundColor = 'white';
return () => {
document.body.style.backgroundColor = '';
};
}, []);


  return (
    <>



    {/*Orden]*/}
        <div className="orden">
            <div className="orden-header">
                <h2>{orden.title}</h2>
                <div className="botones">
                  <button className="btn-delete" onClick={() => deleteOrden(orden._id)}>Eliminar</button> 
                <Link className="btn-edit" to={`/ordenes/${orden._id}`}>Editar</Link>
                </div>
                
            </div>
            <div className="orden-body">
                  <p><span >Descripción:</span> {orden.descripcion}</p>
                <p><span>Fecha:</span> {new Date(orden.date).toLocaleDateString()}</p>
                <p><span>Tipo:</span> {orden.type}</p>
                <p><span>Prioridad:</span> {orden.priority}</p>
            </div>

        </div>
    


    </>
  )
}

export default OrdenCard
