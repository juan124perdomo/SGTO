// Se importa mongoose, la librería para interactuar con MongoDB.
import mongoose from "mongoose";

// Se define el esquema para los documentos de la colección de usuarios.
const userSchema =  new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true, // `trim` elimina los espacios en blanco al principio y al final del string.
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true, // `unique` asegura que no haya dos usuarios con el mismo email.
    },
    password:{
        type: String,
        required: true,
        // `select: false` es una medida de seguridad importante.
        // Evita que la contraseña (incluso hasheada) se devuelva en las consultas por defecto.
        // Para obtenerla, hay que pedirla explícitamente (ej: `.select('+password')`).
        select: false
    },
    telefono:{
        type: String,
        required: true,
        trim: true,
    }
}, {
    // `timestamps: true` añade automáticamente dos campos a cada documento:
    // `createdAt` (fecha de creación) y `updatedAt` (fecha de última actualización).
    timestamps:true
});

// Se exporta el modelo 'User' basado en el esquema 'userSchema'.
// Mongoose usará este modelo para crear, leer, actualizar y eliminar usuarios en la base de datos.
export default mongoose.model("User", userSchema);