import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js";
import { getOrdenes, getOrden, createOrden, updateOrden, deleteOrden } from "../controllers/ordenes.controller.js";


const router = Router();

router.get("/ordenes", authRequired, getOrdenes);
router.get("/ordenes/:id", authRequired, getOrden);
router.post("/ordenes", authRequired, createOrden);
router.put("/ordenes/:id", authRequired, updateOrden);
router.delete("/ordenes/:id", authRequired, deleteOrden);

export default router;