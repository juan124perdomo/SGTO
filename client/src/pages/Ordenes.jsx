import {  useEffect } from "react";
import {useOrdenes} from "../context/Ordencontext";
import "../style/Ordenes.css";
import OrdenCard from "../components/OrdenCard";

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
         <OrdenCard key={orden._id} orden={orden} />
        )) 
      }
    </>
  )
}

export default Ordenes
