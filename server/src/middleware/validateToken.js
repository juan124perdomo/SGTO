// Se importa la librería 'jsonwebtoken' para poder verificar los tokens.
import jwt from "jsonwebtoken";
// Se importa la clave secreta del token desde el archivo de configuración.
import { TOKEN_SECRET } from "../config.js";

/**
 * @description Middleware de Express para proteger rutas.
 * Verifica si hay un token válido en las cookies de la solicitud.
 * Si el token es válido, permite el paso a la siguiente función (controlador).
 * Si no, devuelve un error de autorización.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 * @param {function} next - La función para pasar al siguiente middleware.
 */
export const authRequired = (req, res, next) => {
  // 1. Extrae el token de las cookies de la solicitud.
  const { token } = req.cookies;

  // 2. Si no se encuentra ningún token, se deniega el acceso.
  if (!token) return res.status(403).json({ message: "No token, authorization denied" });

  // 3. Verifica el token usando la clave secreta.
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    // Si hay un error en la verificación (token inválido, expirado, etc.), se deniega el acceso.
    if (err) return res.status(403).json({ message: "Token inválido" });

    // 4. Si el token es válido, el payload decodificado (que contiene el ID del usuario) se añade al objeto `req`.
    // De esta forma, las rutas protegidas tendrán acceso a la información del usuario que hizo la petición.
    req.user = user;
    // 5. Llama a `next()` para continuar con la ejecución de la siguiente función en la cadena (el controlador de la ruta).
    next();
  });
};