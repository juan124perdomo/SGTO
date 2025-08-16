import { createContext, useContext, useState } from "react";
import {createOrdenRequest, getOrdenesRequest} from "../api/ordenes";

const OrdenContext = createContext();

export const useOrdenes = () => {
 
    const context = useContext(OrdenContext);
    if(!context){
        throw new Error("useOrdenes debe estar dentro de un OrdenProvider");}
    return context;


};




export function OrdenProvider({children}) {

    const[ordenes, setOrdenes] = useState([]);

    const getOrdenes = async () => {
        try {
            const res = await getOrdenesRequest();
            setOrdenes(res.data);
        } catch(error){
            console.error("Error al obtener las órdenes:", error);
        }
     }; 
    
    const createOrden = async (orden) =>{
        const res = await createOrdenRequest(orden);
        console.log(res);
    }

    return (
        <OrdenContext.Provider value={{ordenes,createOrden, getOrdenes}}>
            {children}</OrdenContext.Provider>
    );
}