import { getOrdenById } from "../models/orden.model.js";

/**
 * @description Obtiene un reporte a través del ID de la orden.
 * Un usuario solo puede ver el reporte si es el cliente de la orden,
 * el técnico asignado, o un administrador.
 */
export const getReporteController = async (req, res) => {
  try {
    const ordenId = Number(req.params.id);
    // Usamos la función importada para obtener una orden, que incluye el reporte.
    const orden = await getOrdenById(ordenId);

    if (!orden || !orden.reporte) {
      return res.status(404).json({ message: "Reporte no encontrado." });
    }

    res.json(orden.reporte);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el reporte.", error: error.message });
  }
};