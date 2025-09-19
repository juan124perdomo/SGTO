import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js";
import { roleRequired } from "../middleware/roleRequired.js";
import { getReporteController } from "../controllers/reportes.controller.js";

const router = Router();
const ROLES = { USER: 1, ADMIN: 2, TECNICO: 3 };

// Ruta para obtener un reporte específico por el ID de la orden
// GET /api/reportes/:id
// Todos los roles pueden ver un reporte si tienen acceso a la orden.
// La lógica de permisos está en el controlador getOrden.
router.get("/reportes/:id", authRequired, getReporteController);


export default router;