// --- IMPORTACIÓN DE MÓDULOS ---
// Importa Express, el framework principal para construir la aplicación web.
import express from "express";
// Importa Morgan, un middleware para registrar (loggear) las peticiones HTTP en la consola. Es útil para depuración.
import morgan from "morgan";
// Importa cookie-parser, un middleware para analizar las cookies de las peticiones y popular `req.cookies`.
import cookieParser from "cookie-parser";
// Importa las rutas de autenticación (login, register, etc.) desde el archivo auth.routes.js.
import  authRoutes from "./routes/auth.routes.js";
// Importa las rutas relacionadas con las órdenes desde el archivo ordenes.routes.js.
import ordenesRoutes from './routes/ordenes.routes.js';
// Importa cors, un middleware para habilitar el Cross-Origin Resource Sharing (CORS).
import cors from "cors";


// --- INICIALIZACIÓN DE LA APLICACIÓN ---
// Se crea una instancia de la aplicación Express.
const app = express();

// --- CONFIGURACIÓN DE MIDDLEWARES ---
// Habilita CORS para permitir que el frontend (en http://localhost:5173) se comunique con este servidor.
// Sin esto, el navegador bloquearía las peticiones por seguridad.
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Permite que el frontend envíe cookies en sus peticiones. Es crucial para la autenticación.
}));

// Usa Morgan en modo 'dev' para mostrar logs de peticiones concisos y coloreados en la consola.
app.use(morgan("dev"));
// Habilita el middleware de Express para analizar cuerpos de peticiones en formato JSON.
// Esto permite acceder a los datos enviados en el body de peticiones POST, PUT, etc., a través de `req.body`.
app.use(express.json());
// Usa el middleware cookie-parser para poder leer y escribir cookies en el navegador del cliente.
app.use(cookieParser());

// --- MONTAJE DE RUTAS ---
// Monta las rutas de autenticación bajo el prefijo '/api'.
// Todas las rutas definidas en authRoutes (ej. /register) serán accesibles como /api/register.
app.use('/api',authRoutes);
// Monta las rutas de órdenes bajo el mismo prefijo '/api'.
// Todas las rutas en ordenesRoutes (ej. /ordenes) serán accesibles como /api/ordenes.
app.use('/api', ordenesRoutes);

// --- EXPORTACIÓN ---
// Exporta la instancia de la aplicación 'app' para que pueda ser utilizada por otros archivos (como index.js para iniciar el servidor).
export default app;
