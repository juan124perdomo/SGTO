// Se importan los módulos necesarios.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// importamos funciones del modelo Prisma (helpers)
import {
  createUser,
  findUserById, // Importamos la función para buscar por ID
  findUserByEmail,
  findUserByEmailWithPassword,
  updateUserRoleById,
  findUsersByRole,
  findAllUsers,
} from "../models/user.model.js";

import createAccesToken from "../libs/jwt.js";

/**
 * @description Registra un nuevo usuario en el sistema.
 */
export const register = async (req, res) => {
  const { email, password, username, telefono } = req.body;

  try {
    // 1. Verificar si ya existe el usuario
    const userFound = await findUserByEmail(email);
    if (userFound)
      return res.status(400).json(["El correo ya está en uso"]);

    // 2. Hash de la contraseña
    const passwordhashs = await bcrypt.hash(password, 10);

    // 3. Crear usuario en PostgreSQL
    const newUser = await createUser({
      username,
      email,
      password: passwordhashs,
      telefono,
    });

    // 4. Crear token
    const token = await createAccesToken({ id: newUser.id, roleId: newUser.roleId });

    // 5. Enviar cookie + respuesta
    res.cookie("token", token);
    res.json({
      message: "Usuario registrado y autenticado satisfactoriamente",
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      telefono: newUser.telefono,
      roleId: newUser.roleId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Inicia sesión para un usuario existente.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar usuario (incluye password)
    const userFound = await findUserByEmailWithPassword(email);
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (!userFound.password) {
      return res
        .status(500)
        .json({ message: "El usuario no tiene contraseña guardada" });
    }

    // 2. Comparar contraseñas
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // 3. Crear token
    const token = await createAccesToken({ id: userFound.id, roleId: userFound.roleId });

    // 4. Respuesta
    res.cookie("token", token);
    res.json({
      message: "Autenticación satisfactoria",
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      telefono: userFound.telefono,
      roleId: userFound.roleId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Cierra la sesión del usuario eliminando la cookie del token.
 */
export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

/**
 * @description Obtiene el perfil del usuario autenticado actualmente.
 */
export const profile = async (req, res) => {
  try {
    // req.user viene del middleware authRequired y ya tiene id y roleId.
    // Buscamos el resto de la info del usuario.
    const userFound = await findUserById(req.user.id);

    if (!userFound)
      return res.status(400).json({ message: "usuario no encontrado" });

    return res.json({ // Devolvemos el perfil completo, incluyendo el roleId.
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      telefono: userFound.telefono,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      roleId: userFound.roleId,
      roleName: userFound.role.name, // Devolvemos el nombre del rol
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Verifica si un token es válido.
 */
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "No autorizado" });

    // Corregido: Buscar usuario por ID desde el token, no por email.
    // El token solo contiene 'id' y 'roleId'.
    const userFound = await findUserById(user.id);

    if (!userFound)
      return res.status(400).json({ message: "usuario no encontrado" });

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      roleId: userFound.roleId, // Añadimos el roleId a la respuesta
    });
  });
};

/**
 * @description [ADMIN] Actualiza el rol de un usuario específico.
 */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params; // ID del usuario a modificar
    const { roleId } = req.body; // Nuevo roleId

    // Validación simple
    if (!roleId || ![1, 2, 3].includes(Number(roleId))) {
      return res.status(400).json({ message: "El roleId proporcionado no es válido." });
    }

    const updatedUser = await updateUserRoleById(id, roleId);

    res.json({ message: "Rol de usuario actualizado correctamente.", user: updatedUser });

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol del usuario.", error: error.message });
  }
};

/**
 * @description [ADMIN] Obtiene una lista de todos los usuarios con rol de Técnico.
 */
export const getTecnicos = async (req, res) => {
  try {
    const ROLES = { TECNICO: 3 };
    // Llama a la función del modelo para encontrar usuarios por rol
    const tecnicos = await findUsersByRole(ROLES.TECNICO);
    res.json(tecnicos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de técnicos.", error: error.message });
  }
};

/**
 * @description [ADMIN] Obtiene una lista de todos los usuarios del sistema.
 */
export const getAllUsersController = async (req, res) => {
  try {
    const users = await findAllUsers();
    // Omitimos la contraseña de la respuesta
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de usuarios.", error: error.message });
  }
};
