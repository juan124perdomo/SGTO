// Se importa el enrutador de Express para definir las rutas.
import { Router} from "express";
// Se importan los controladores que contienen la lógica para cada ruta.
import {login, logout, register, profile, verifyToken, updateUserRole, getTecnicos } from "../controllers/auth.controller.js";
import { roleRequired } from "../middleware/roleRequired.js";
// Se importa el middleware `authRequired` para proteger rutas que necesitan autenticación.
import { authRequired } from "../middleware/validateToken.js";
// Se importa el middleware `validateSchema` para validar los datos de entrada.
import {validateSchema} from "../middleware/validator.middleware.js";
// Se importan los esquemas de validación de Zod.
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

// Se crea una nueva instancia del enrutador.
const router = Router();

// IDs de los roles para claridad
const ROLES = { USER: 1, ADMIN: 2, TECNICO: 3 };

// --- Definición de Rutas de Autenticación ---

// Ruta para registrar un nuevo usuario.
// POST /api/register
// 1. `validateSchema(registerSchema)`: Valida que el cuerpo de la petición (req.body) cumpla con el `registerSchema`.
// 2. `register`: Si la validación es exitosa, ejecuta el controlador de registro.
router.post("/register",validateSchema(registerSchema),register);

// Ruta para iniciar sesión.
// POST /api/login
// 1. `validateSchema(loginSchema)`: Valida los datos de inicio de sesión.
// 2. `login`: Si la validación es exitosa, ejecuta el controlador de login.
router.post("/login",validateSchema(loginSchema),login);

// Ruta para cerrar sesión.
// POST /api/logout
router.post("/logout", logout);


router.get("/verify",verifyToken );

// Ruta para obtener el perfil del usuario autenticado.
// GET /api/profile
// 1. `authRequired`: Este middleware se ejecuta primero. Verifica que haya un token válido en la cookie.
//    Si no hay token o es inválido, bloquea la petición.
// 2. `profile`: Si el token es válido, se ejecuta el controlador para obtener los datos del perfil.
router.get("/profile", authRequired, profile);

// --- Rutas de Administración de Usuarios ---

// Ruta para que un administrador actualice el rol de otro usuario.
// PUT /api/users/:id/role
router.put("/users/:id/role", authRequired, roleRequired([ROLES.ADMIN]), updateUserRole);

// Ruta para que un administrador obtenga la lista de todos los técnicos.
// GET /api/users/tecnicos
router.get("/users/tecnicos", authRequired, roleRequired([ROLES.ADMIN]), getTecnicos);

export default router;