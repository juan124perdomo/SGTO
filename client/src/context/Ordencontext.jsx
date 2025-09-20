import { createContext, useContext, useState, useEffect } from "react";
import { createOrdenRequest, getOrdenesRequest, deleteOrdenRequest, getOrdenRequest, updateOrdenRequest, getReportesRequest } from "../api/ordenes";
import { createReporteRequest } from "../api/reportes";
import io from 'socket.io-client';

const OrdenContext = createContext();

export const useOrdenes = () => {
    const context = useContext(OrdenContext);
    if (!context) {
        throw new Error("useOrdenes debe estar dentro de un OrdenProvider");
    }
    return context;
};

export function OrdenProvider({ children }) {
    const [ordenes, setOrdenes] = useState([]);
    const [errors, setErrors] = useState([]);
    const [reportes, setReportes] = useState([]);

    const getOrdenes = async () => {
        try {
            const res = await getOrdenesRequest();
            setOrdenes(res.data);
        } catch (error) {
            console.error("Error al obtener las órdenes:", error);
        }
    };

    const getReportes = async () => {
        try {
            const res = await getReportesRequest();
            setReportes(res.data);
        } catch (error) {
            console.error("Error al obtener los reportes:", error);
        }
    };

    useEffect(() => {
        const socket = io("http://localhost:3000");

        socket.on('ordenes_actualizadas', () => {
            console.log("Recibido evento 'ordenes_actualizadas', actualizando listas...");
            getOrdenes();
            getReportes();
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Dejamos el array de dependencias vacío para que se ejecute solo una vez.

    const clearOrdenes = () => {
        setOrdenes([]);
        setReportes([]);
        setErrors([]);
    };

    const createOrden = async (orden) => {
        const res = await createOrdenRequest(orden);
        console.log(res);
    };

    const deleteOrden = async (id) => {
        try {
            const res = await deleteOrdenRequest(id);
            if (res.status === 204) setOrdenes(prevOrdenes => prevOrdenes.filter(orden => orden.id !== id));
            console.log("Orden eliminada con éxito");
        } catch (error) {
            console.error("Error al eliminar la orden:", error);
        }
    };

    const getOrden = async (id) => {
        try {
            const res = await getOrdenRequest(id);
            return res.data;
        } catch (error) {
            console.error("Error al obtener la orden:", error);
        }
    };

    const updateOrden = async (id, orden) => {
        try {
            await updateOrdenRequest(id, orden);
        } catch (error) {
            console.error("Error al actualizar la orden:", error);
        }
    };

    const createReporte = async (id, reporte) => {
        try {
            await createReporteRequest(id, reporte);
            setOrdenes(prev => prev.map(o => o.id === id ? { ...o, status: 'FINALIZADA' } : o));
            return true;
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors([error.response.data.message]);
            }
            return false;
        }
    };

    return (
        <OrdenContext.Provider value={{
            ordenes,
            createOrden,
            getOrdenes,
            deleteOrden,
            getOrden,
            updateOrden,
            createReporte,
            errors,
            reportes,
            getReportes,
            clearOrdenes
        }}>
            {children}
        </OrdenContext.Provider>
    );
}