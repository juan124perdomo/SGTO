// Este archivo centraliza las variables de configuración de la aplicación.

// TOKEN_SECRET es la clave secreta utilizada para firmar y verificar los JSON Web Tokens (JWT).
// Es fundamental para la seguridad de la autenticación.
// ADVERTENCIA: En un entorno de producción, esta clave nunca debe estar hardcodeada en el código.
// Debería ser una cadena larga, compleja y aleatoria, y cargarse desde variables de entorno.
export const TOKEN_SECRET = "some secret key";