import axios from './axios';

export const getOrdenesRequest =  () => axios.get('/ordenes');

export const getOrdenRequest = (id) => axios.get(`/ordenes/${id}`);

export const createOrdenRequest = (orden) => axios.post('/ordenes', orden);

export const updateOrdenRequest = (orden) => axios.put(`/ordenes/${orden._id}`, orden);

export const deleteOrdenRequest = (id) => axios.delete(`/ordenes/${id}`);

