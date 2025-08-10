import { z } from "zod";

export const createOrdenSchema = z.object({
  title: z.string({
    required_error: "El Título es requerido",
  }),
  descripcion: z.string({
    required_error: "La descripción es requerida",
    invalid_type_error: "La descripción debe ser un string",
  }),
  date: z.string().datetime().optional(),
  type: z.string({
    required_error: "El tipo es requerido",
    invalid_type_error: "El tipo debe ser un string",
  }),
   priority: z.string({
    required_error: "La prioridad es requerida",
    invalid_type_error: "La prioridad debe ser un string",
  }),
});
