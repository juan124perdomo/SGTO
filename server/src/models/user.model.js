// src/models/user.model.js  (uso de Prisma)
import prisma from "../db.js";

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
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

export default {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  updateUserRoleById,
};