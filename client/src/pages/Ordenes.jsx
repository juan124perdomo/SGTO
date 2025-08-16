import {  useEffect } from "react";
import {useOrdenes} from "../context/Ordencontext";
import "../style/Ordenes.css";

function Ordenes() {
  const{ getOrdenes, ordenes } = useOrdenes();

  useEffect(() => {
    getOrdenes();
  }, [getOrdenes]);

  if(ordenes.length === 0) {
    return <h1>No hay órdenes disponibles</h1>;
  }


  return (
    
    <>
      {
        ordenes.map((orden) => (
          <div className="container-orden" key={orden._id}>
            <div className="orden">
            
            <h2>{orden.title}</h2>
            <p>{orden.descripcion}</p>
            <p>{orden.date}</p>
            <p>{orden.type}</p>
            <p>{orden.priority}</p>
            </div>
          </div>
        )) 
      }
    </>
  )
}

export default Ordenes
