// src/models/user.model.js  (uso de Prisma)
import prisma from "../db.js";

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
    // Incluimos la información del rol relacionado
    include: {
      role: true,
    },
  });
};

// si necesitas el password (por login)
export const findUserByEmailWithPassword = (email) => {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, username: true, email: true, password: true, telefono: true, roleId: true }
  });
};

export const updateUserRoleById = (id, roleId) => {
  return prisma.user.update({
    where: { id: Number(id) },
    data: { roleId: Number(roleId) },
  });
};

export const findUsersByRole = async (roleId) => {
  return prisma.user.findMany({
    where: {
      roleId: Number(roleId),
    },
    // Seleccionamos solo los campos que el frontend necesita para evitar enviar la contraseña
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export const findAllUsers = (options = {}) => {
  return prisma.user.findMany({
    ...options,
    include: {
      role: true, // Incluimos la información del rol
    },
    orderBy: { createdAt: 'desc' },
  });
};