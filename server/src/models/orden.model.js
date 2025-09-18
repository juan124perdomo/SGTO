import prisma from "../db.js";

export const createOrden = (data) => prisma.orden.create({ data });

export const getOrdenesByUser = (userId) =>
    prisma.orden.findMany({
    where: { userId: Number(userId) },
    include: { user: true },
    });

export const getOrdenesByTecnico = (tecnicoId) =>
  prisma.orden.findMany({
    where: { tecnicoAsignadoId: Number(tecnicoId) },
    include: { user: true }, // Incluye al cliente que creó la orden
  });

export const getAllOrdenes = () =>
  prisma.orden.findMany({ include: { user: true } });

export const updateOrden = (id, data) =>
  prisma.orden.update({
    where: { id: Number(id) },
    data,
  });

export const deleteOrden = (id) =>
  prisma.orden.delete({
    where: { id: Number(id) },
  });

export const getOrdenById = (id) =>
  prisma.orden.findUnique({
    where: { id: Number(id) },
    // Incluimos el reporte y el usuario que creó la orden.
    include: {
      reporte: true,
      user: true,
    },
  });
export const getOrdenByIdAndUser = (ordenId, userId) =>
  prisma.orden.findFirst({
    where: {
      id: Number(ordenId),
      userId: Number(userId),
    },
    // Incluimos el reporte asociado a la orden.
    include: {
      user: true,
      reporte: true,
    },
  });

export const assignOrdenToTecnico = (ordenId, tecnicoId) =>
  prisma.orden.update({
    where: { id: Number(ordenId) },
    data: {
      tecnicoAsignadoId: Number(tecnicoId),
    },
  });

export const createReporte = (data) => prisma.reporte.create({ data });

export default {
  createOrden,
  getOrdenesByUser,
  getOrdenesByTecnico,
  getAllOrdenes,
  updateOrden,
  deleteOrden,
  getOrdenByIdAndUser, // Exportamos la nueva función
  getOrdenById,
  assignOrdenToTecnico,
  createReporte,
};