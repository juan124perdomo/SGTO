// Se importa la librería Zod, que se utiliza para la validación de esquemas de datos.
import { z} from "zod";

// Esquema de validación para el registro de un nuevo usuario.
export const registerSchema = z.object({
    // El nombre de usuario debe ser un string.
    username: z.string({
        // Mensaje de error si el campo no se proporciona.
        required_error: "El nombre de usuario es requerido",
    }).min(3, {
        // Regla: debe tener como mínimo 3 caracteres.
        message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
    // El email debe ser un string.
    email: z.string({
        required_error: "El email es requerido",
    }).email({
        // Regla: debe tener un formato de email válido.
        message: "El email no es válido",
    }),
    // La contraseña debe ser un string.
    password: z.string({
        required_error: "La contraseña es requerida",
    }).min(6, {
        // Regla: debe tener como mínimo 6 caracteres.
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
    // El teléfono debe ser un string.
    telefono: z.string({
        required_error: "El teléfono es requerido",
    }).min(10, {
        // Regla: debe tener como mínimo 10 caracteres.
        message: "El teléfono debe tener al menos 10 caracteres",
    }),
});

// Esquema de validación para el inicio de sesión.
export const loginSchema = z.object({
    // El email debe ser un string y tener formato de email.
    email: z.string({
        required_error: "El correo es requerido",
    }).email({
        message: "El correo no es válido",
    }),
    // La contraseña debe ser un string y tener al menos 6 caracteres.
    password: z.string({
        required_error: "La contraseña es requerida",
    }).min(6,{
        message: "La contraseña debe tener al menos 6 caracteres", 
    }),
});