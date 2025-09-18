// Se importa la librería Zod para la validación de esquemas.
import { z } from "zod";

// Esquema de validación para la creación de una nueva orden.
export const createOrdenSchema = z.object({
  // El título es un string y es requerido.
  title: z.string({
    required_error: "El Título es requerido",
  }),
  // La descripción es un string y es requerida.
  descripcion: z.string({
    required_error: "La descripción es requerida",
    invalid_type_error: "La descripción debe ser un string",
  }),
  // La fecha debe ser un string con formato de fecha y hora (datetime).
  // `.optional()` hace que este campo no sea obligatorio.
  date: z.string().optional(),
  // El tipo es un string y es requerido.
  type: z.string({
    required_error: "El tipo es requerido",
    invalid_type_error: "El tipo debe ser un string",
  }),
  // La prioridad es un string y es requerida.
  priority: z.string({
    required_error: "La prioridad es requerida",
    invalid_type_error: "La prioridad debe ser un string",
  }),
  // El estado es opcional al crear, ya que tiene un valor por defecto.
  status: z.enum(["PENDIENTE", "EN_PROCESO", "FINALIZADA"]).optional(),
});
