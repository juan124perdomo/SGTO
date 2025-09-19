import {  useEffect } from "react";
import {useOrdenes} from "../context/OrdenContext";
import "../style/Ordenes.css";
import OrdenCard from "../components/OrdenCard";

function Ordenes() {
  const{ getOrdenes, ordenes, deleteOrden } = useOrdenes();

  useEffect(() => {
    getOrdenes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(ordenes.length === 0) {
    return <h1>No hay órdenes disponibles</h1>;
  }


  return (
    <div className="ordenes-grid">
      {ordenes.length > 0 ? (
        ordenes.map((orden) => (
         <OrdenCard key={orden.id} orden={orden} deleteOrden={deleteOrden} />
        )) 
      ) : null}
    </div>
  )
}

export default Ordenes
