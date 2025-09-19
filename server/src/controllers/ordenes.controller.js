import { getAllOrdenes, getOrdenesByTecnico, getOrdenesByUser, getOrdenById, getOrdenByIdAndUser, deleteOrden as deleteOrdenModel, updateOrden as updateOrdenModel, createOrden as createOrdenModel, createReporte } from "../models/orden.model.js";

/**
 * @description Obtiene todas las órdenes asociadas al usuario autenticado.
 */
export const getOrdenes = async (req, res) => {
  try {
    const userId = Number(req.user.id);
    const userRoleId = Number(req.user.roleId);
    let ordenes;

    // Lógica de roles para obtener órdenes
    if (userRoleId === 2) { // Rol de Administrador
      ordenes = await getAllOrdenes();
    } else if (userRoleId === 3) { // Rol de Técnico
      ordenes = await getOrdenesByTecnico(userId);
    } else { // Rol de Cliente (o cualquier otro)
      ordenes = await getOrdenesByUser(userId);
    }

    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las órdenes", error: error.message });
  }
};

/**
 * @description Crea una nueva orden.
 */
export const createOrden = async (req, res) => {
  try {
    const { title, descripcion, date, type, priority } = req.body;

    const newOrden = await createOrdenModel({
      userId: Number(req.user.id),
      title,
      descripcion,
      date: date ? new Date(date) : new Date(), // Convertir el string a objeto Date
      type,
      priority,
    });

    // Emitimos un evento para notificar a todos los clientes
    req.io.emit('ordenes_actualizadas');

    res.status(201).json(newOrden);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la orden", error: error.message });
  }
};

/**
 * @description Obtiene una única orden por su ID.
 */
export const getOrden = async (req, res) => {
  try {
    const ordenId = Number(req.params.id);
    const userId = Number(req.user.id);
    const userRoleId = Number(req.user.roleId);

    let orden;

    // Si el usuario es Administrador (roleId = 2) o Técnico (roleId = 3), puede ver cualquier orden.
    if (userRoleId === 2 || userRoleId === 3) {
      orden = await getOrdenById(ordenId);
    } else {
      // Si no, solo puede ver sus propias órdenes.
      orden = await getOrdenByIdAndUser(ordenId, userId);
    }
    
    if (!orden) return res.status(404).json({ message: "Orden no encontrada" });

    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la orden", error: error.message });
  }
};

/**
 * @description Elimina una orden por su ID.
 */
export const deleteOrden = async (req, res) => {
  try {
    const ordenId = Number(req.params.id);
    const userId = Number(req.user.id);
    const userRoleId = Number(req.user.roleId);

    // Si el usuario NO es Administrador (roleId != 2), verificamos que sea el dueño.
    if (userRoleId !== 2) {
      // Verificamos que la orden existe Y PERTENECE AL USUARIO antes de borrar
      const orden = await getOrdenByIdAndUser(ordenId, userId);
      if (!orden) {
        return res.status(404).json({ message: "Orden no encontrada o no tienes permiso para eliminarla" });
      }
    } else {
      // Si es Administrador, solo verificamos que la orden exista.
      const orden = await getOrdenById(ordenId);
      if (!orden) return res.status(404).json({ message: "Orden no encontrada" });
    }

    await deleteOrdenModel(ordenId);

    // Emitimos un evento para notificar a todos los clientes
    req.io.emit('ordenes_actualizadas');
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la orden", error: error.message });
  }
};

/**
 * @description Actualiza una orden existente por su ID.
 */
export const updateOrden = async (req, res) => {
  try {
    const ordenId = Number(req.params.id);
    const userId = Number(req.user.id);

    // Verificamos que la orden existe y pertenece al usuario antes de actualizar
    const orden = await getOrdenByIdAndUser(ordenId, userId);
    if (!orden) return res.status(404).json({ message: "Orden no encontrada o no tienes permiso para actualizarla" });

    const ordenActualizada = await updateOrdenModel(ordenId, req.body);

    // Emitimos un evento para notificar a todos los clientes
    req.io.emit('ordenes_actualizadas');

    res.json(ordenActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la orden", error: error.message });
  }
};

/**
 * @description [ADMIN] Obtiene TODAS las órdenes del sistema.
 */
export const getAllOrdenesController = async (req, res) => {
  try {
    const ordenes = await getAllOrdenes();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todas las órdenes", error: error.message });
  }
};

/**
 * @description [TECNICO] Obtiene las órdenes asignadas al técnico.
 * (Esta es una función de ejemplo, la lógica real dependería de tu modelo de datos)
 */
export const getOrdenesAsignadas = async (req, res) => {
  try {
    const tecnicoId = Number(req.user.id);
    const ordenes = await getOrdenesByTecnico(tecnicoId);
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las órdenes asignadas.", error: error.message });
  }
};

/**
 * @description [ADMIN] Asigna una orden a un técnico.
 */
export const assignOrdenController = async (req, res) => {
  try {
    const ordenId = Number(req.params.id);
    const { tecnicoId } = req.body;

    if (!tecnicoId) {
      return res.status(400).json({ message: "El ID del técnico es requerido." });
    }

    // Aquí podrías añadir una validación para asegurar que el tecnicoId corresponde a un usuario con rol de técnico.

    const updatedOrden = await updateOrdenModel(ordenId, {
      tecnicoAsignadoId: Number(tecnicoId),
      status: 'EN_PROCESO', // Cambiamos el estado a EN_PROCESO
    });

    // Emitimos un evento de notificación al frontend
    req.io.emit('ordenAsignada', { tecnicoId: Number(tecnicoId), orden: updatedOrden });

    // También emitimos un evento general para actualizar las listas
    req.io.emit('ordenes_actualizadas');

    res.json({ message: "Orden asignada y en proceso.", orden: updatedOrden });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar la orden.", error: error.message });
  }
};

/**
 * @description [TECNICO/ADMIN] Crea un reporte para una orden específica.
 */
export const createReporteController = async (req, res) => {
  try {
    const ordenId = Number(req.params.id);
    const tecnicoId = Number(req.user.id);
    const { descripcion } = req.body;

    if (!descripcion) {
      return res.status(400).json({ message: "La descripción del reporte es requerida." });
    }

    // --- Verificación de Permisos ---
    // 1. Buscamos la orden para verificar quién es el técnico asignado.
    const orden = await getOrdenById(ordenId);
    if (!orden) return res.status(404).json({ message: "Orden no encontrada." });

    // 2. Comparamos el ID del técnico asignado con el ID del usuario que hace la petición.
    if (orden.tecnicoAsignadoId !== tecnicoId) {
      return res.status(403).json({ message: "No tienes permiso para crear un reporte para esta orden." });
    }

    // 1. Creamos el reporte
    const newReporte = await createReporte({
      ordenId,
      tecnicoId,
      descripcion,
    });

    // 2. Actualizamos el estado de la orden a FINALIZADA
    await updateOrdenModel(ordenId, {
      status: 'FINALIZADA',
    });

    // Emitimos un evento para notificar a todos los clientes
    req.io.emit('ordenes_actualizadas');

    res.status(201).json(newReporte);
  } catch (error) {
    // Manejo de error si el reporte ya existe para esa orden (por la restricción 'unique')
    if (error.code === 'P2002') {
      return res.status(409).json({ message: "Ya existe un reporte para esta orden." });
    }
    res.status(500).json({ message: "Error al crear el reporte.", error: error.message });
  }
};

/**
 * @description [ADMIN/TECNICO] Obtiene las órdenes finalizadas.
 */
export const getReportesController = async (req, res) => {
  try {
    const userRoleId = Number(req.user.roleId);
    const userId = Number(req.user.id);
    let ordenes;

    if (userRoleId === 2) { // Si es Admin
      ordenes = await getAllOrdenes();
    } else { // Si es Técnico
      ordenes = await getOrdenesByTecnico(userId);
    }

    res.json(ordenes.filter(o => o.status === 'FINALIZADA' && o.reporte));
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los reportes.", error: error.message });
  }
};