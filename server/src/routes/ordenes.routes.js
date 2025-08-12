// Se importa el enrutador de Express.
import { Router } from "express";
// Se importa el middleware de autenticación para proteger las rutas.
import { authRequired } from "../middleware/validateToken.js";
// Se importan los controladores con la lógica para manejar las órdenes.
import { getOrdenes, getOrden, createOrden, updateOrden, deleteOrden } from "../controllers/ordenes.controller.js";
// Se importa el middleware de validación.
import { validateSchema } from "../middleware/validator.middleware.js";
// Se importa el esquema de validación para la creación de órdenes.
import { createOrdenSchema} from "../schemas/ordenes.schema.js";

// Se crea una nueva instancia del enrutador.
const router = Router();

// --- Definición de Rutas CRUD para Órdenes ---
// Todas estas rutas están protegidas por `authRequired`, lo que significa que
// solo un usuario autenticado puede acceder a ellas.

// Obtiene todas las órdenes del usuario autenticado.
// GET /api/ordenes
router.get("/ordenes", authRequired, getOrdenes);

// Obtiene una orden específica por su ID.
// GET /api/ordenes/:id
router.get("/ordenes/:id", authRequired, getOrden);

// Crea una nueva orden.
// POST /api/ordenes
// `validateSchema(createOrdenSchema)` valida los datos antes de pasarlos al controlador `createOrden`.
router.post("/ordenes", authRequired,validateSchema(createOrdenSchema) ,createOrden);

// Actualiza una orden existente por su ID.
// PUT /api/ordenes/:id
router.put("/ordenes/:id", authRequired, updateOrden);

// Elimina una orden por su ID.
// DELETE /api/ordenes/:id
router.delete("/ordenes/:id", authRequired, deleteOrden);

export default router;