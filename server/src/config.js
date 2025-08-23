// Este archivo centraliza las variables de configuración de la aplicación.

// TOKEN_SECRET es la clave secreta utilizada para firmar y verificar los JSON Web Tokens (JWT).
// Es fundamental para la seguridad de la autenticación.
// ADVERTENCIA: En un entorno de producción, esta clave nunca debe estar hardcodeada en el código.
// Debería ser una cadena larga, compleja y aleatoria, y cargarse desde variables de entorno.
export const TOKEN_SECRET = "some secret key";


export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/SGTO";
export const PORT = process.env.PORT || 3000;