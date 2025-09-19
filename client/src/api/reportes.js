import axios from './axios';

// Nota: La ruta GET /reportes ya la tenemos en ordenes.js, la mantenemos ahí
// porque devuelve 'ordenes finalizadas', no una entidad 'reporte' separada.

export const getReporteRequest = (id) => axios.get(`/reportes/${id}`);

export const createReporteRequest = (ordenId, reporte) => axios.post(`/ordenes/${ordenId}/reporte`, reporte);

export const updateReporteRequest = (id, reporte) => axios.put(`/reportes/${id}`, reporte);

export const deleteReporteRequest = (id) => axios.delete(`/reportes/${id}`);