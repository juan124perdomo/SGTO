import axios from "./axios.js";

// Obtiene todas las órdenes (para admin/tecnico)
export const getAllOrdenesRequest = () => axios.get(`/ordenes/all`);

// Obtiene la lista de todos los técnicos (para admin)
export const getTecnicosRequest = () => axios.get(`/users/tecnicos`);

// Asigna una orden a un técnico
export const assignOrdenRequest = (ordenId, tecnicoId) => axios.put(`/ordenes/${ordenId}/asignar`, { tecnicoId });

// Obtiene todos los usuarios
export const getAllUsersRequest = () => axios.get('/users');

// Actualiza el rol de un usuario
export const updateUserRoleRequest = (userId, roleId) => axios.put(`/users/${userId}/role`, { roleId });