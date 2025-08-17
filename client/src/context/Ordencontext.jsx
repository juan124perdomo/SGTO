import { createContext, useContext, useState } from "react";
import {createOrdenRequest, getOrdenesRequest, deleteOrdenRequest, getOrdenRequest, updateOrdenRequest} from "../api/ordenes";

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

    const deleteOrden = async (id) => { 
        try {
            const res = await deleteOrdenRequest(id);
            if(res.status === 204) setOrdenes(ordenes.filter(orden => orden._id !== id));
            console.log("Orden eliminada con éxito");
        } catch (error) {
            console.error("Error al eliminar la orden:", error);
            
        }
        
    }

    const getOrden =async (id) => {
        try {
            const res = await getOrdenRequest(id);
        return res.data;
        } catch (error) {
            console.error("Error al obtener la orden:", error);
           
        }
    }

    const updateOrden = async (id, orden) => {
        try{
            await updateOrdenRequest(id, orden);
        }catch (error) {
            console.error("Error al actualizar la orden:", error);
        }
    }

    return (
        <OrdenContext.Provider value={{ordenes,createOrden, getOrdenes, deleteOrden, getOrden, updateOrden}}>
            {children}</OrdenContext.Provider>
    );
}