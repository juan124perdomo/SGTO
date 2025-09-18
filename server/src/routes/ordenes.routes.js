// Se importa el enrutador de Express.
import { Router } from "express";
// Se importa el middleware de autenticación para proteger las rutas.
import { authRequired } from "../middleware/validateToken.js";
import { roleRequired } from "../middleware/roleRequired.js"; // Importamos el nuevo middleware flexible
// Se importan los controladores con la lógica para manejar las órdenes.
import { getOrdenes, getOrden, createOrden, updateOrden, deleteOrden, getAllOrdenesController, getOrdenesAsignadas, createReporteController, assignOrdenController } from "../controllers/ordenes.controller.js";
// Se importa el middleware de validación.
import { validateSchema } from "../middleware/validator.middleware.js";
// Se importa el esquema de validación para la creación de órdenes.
import { createOrdenSchema} from "../schemas/ordenes.schema.js";

// Se crea una nueva instancia del enrutador.
const router = Router();

// IDs de los roles para claridad
const ROLES = { USER: 1, ADMIN: 2, TECNICO: 3 };

// --- Rutas para usuarios normales (requieren estar logueados) ---

// Obtiene todas las órdenes del usuario autenticado.
// GET /api/ordenes
router.get("/ordenes", authRequired, getOrdenes);

// --- Ruta solo para Administradores ---

// Obtiene TODAS las órdenes del sistema.
// GET /api/ordenes/all
router.get("/ordenes/all", authRequired, roleRequired([ROLES.ADMIN]), getAllOrdenesController);

// Ruta para que un administrador asigne una orden a un técnico.
// PUT /api/ordenes/:id/asignar
router.put("/ordenes/:id/asignar", authRequired, roleRequired([ROLES.ADMIN]), assignOrdenController);

// --- Ruta solo para Técnicos ---

// Ruta para que un técnico vea las órdenes que le han sido asignadas.
// GET /api/ordenes/asignadas
// Ahora, tanto el técnico como el admin pueden acceder a esta ruta.
router.get("/ordenes/asignadas", authRequired, roleRequired([ROLES.ADMIN, ROLES.TECNICO]), getOrdenesAsignadas);

// Obtiene una orden específica del usuario por su ID.
// GET /api/ordenes/:id
router.get("/ordenes/:id", authRequired, getOrden);

// Crea una nueva orden.
// POST /api/ordenes
// `validateSchema(createOrdenSchema)` valida los datos antes de pasarlos al controlador `createOrden`.
router.post("/ordenes", authRequired, validateSchema(createOrdenSchema), createOrden);

// Ruta para que un técnico o admin cree un reporte para una orden.
// POST /api/ordenes/:id/reporte
router.post("/ordenes/:id/reporte", authRequired, roleRequired([ROLES.ADMIN, ROLES.TECNICO]), createReporteController);

// Actualiza una orden existente del usuario por su ID.
// PUT /api/ordenes/:id
router.put("/ordenes/:id", authRequired, updateOrden);

// Elimina una orden del usuario por su ID.
// DELETE /api/ordenes/:id
router.delete("/ordenes/:id", authRequired, deleteOrden);

export default router;