// Se importa la librería 'jsonwebtoken' para crear y verificar tokens.
import jwt from "jsonwebtoken";
// Se importa el secreto del token desde el archivo de configuración. Es crucial que esta clave sea segura y no se exponga.
import { TOKEN_SECRET } from "../config.js";

/**
 * @description Crea un JSON Web Token (JWT) de acceso.
 * @param {object} payload - Los datos que se quieren almacenar en el token (generalmente, el ID del usuario).
 * @returns {Promise<string>} Una promesa que se resuelve con el token generado.
 */
export default function createAccesToken(payload) {
    // Se devuelve una Promesa para poder usar async/await al llamar esta función.
    return new Promise((resolve,reject)=>{
        // La función `sign` de jwt crea el token.
        jwt.sign(
            payload, // El contenido del token (ej: { id: '...' }).
            TOKEN_SECRET, // La clave secreta para firmar el token.
            {
                expiresIn: "1d" // Opciones del token, como el tiempo de expiración (aquí, 1 día).
            },
            (err, token) => {
                if (err) reject(err); // Si hay un error al crear el token, se rechaza la promesa.
                resolve(token); // Si se crea con éxito, se resuelve la promesa con el token.
            }
        );
    });
}