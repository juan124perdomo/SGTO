import Orden from "../models/orden.model.js";

/**
 * @description Obtiene todas las órdenes asociadas al usuario autenticado.
 */
export const getOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.getOrdenesByUser(req.user.id);
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

    const newOrden = await Orden.createOrden({
      userId: Number(req.user.id),
      title,
      descripcion,
      date,
      type,
      priority,
    });

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
      orden = await Orden.getOrdenById(ordenId);
    } else {
      // Si no, solo puede ver sus propias órdenes.
      orden = await Orden.getOrdenByIdAndUser(ordenId, userId);
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
      const orden = await Orden.getOrdenByIdAndUser(ordenId, userId);
      if (!orden) {
        return res.status(404).json({ message: "Orden no encontrada o no tienes permiso para eliminarla" });
      }
    } else {
      // Si es Administrador, solo verificamos que la orden exista.
      const orden = await Orden.getOrdenById(ordenId);
      if (!orden) return res.status(404).json({ message: "Orden no encontrada" });
    }

    await Orden.deleteOrden(ordenId);
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
    const orden = await Orden.getOrdenByIdAndUser(ordenId, userId);
    if (!orden) return res.status(404).json({ message: "Orden no encontrada o no tienes permiso para actualizarla" });

    const ordenActualizada = await Orden.updateOrden(ordenId, req.body);

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
    const ordenes = await Orden.getAllOrdenes();
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
    const ordenes = await Orden.getOrdenesByTecnico(tecnicoId);
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

    const updatedOrden = await Orden.assignOrdenToTecnico(ordenId, tecnicoId);
    res.json({ message: "Orden asignada correctamente.", orden: updatedOrden });
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

    const newReporte = await Orden.createReporte({
      ordenId,
      tecnicoId,
      descripcion,
    });

    res.status(201).json(newReporte);
  } catch (error) {
    // Manejo de error si el reporte ya existe para esa orden (por la restricción 'unique')
    if (error.code === 'P2002') {
      return res.status(409).json({ message: "Ya existe un reporte para esta orden." });
    }
    res.status(500).json({ message: "Error al crear el reporte.", error: error.message });
  }
};