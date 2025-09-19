// --- IMPORTACIÓN DE MÓDULOS ---
// Importa Express, el framework principal para construir la aplicación web.
import http from 'http';
import { Server as SocketServer } from 'socket.io';

import express from "express";
// Importa Morgan, un middleware para registrar (loggear) las peticiones HTTP en la consola. Es útil para depuración.
import morgan from "morgan";
// Importa cookie-parser, un middleware para analizar las cookies de las peticiones y popular `req.cookies`.
import cookieParser from "cookie-parser";
// Importa las rutas de autenticación (login, register, etc.) desde el archivo auth.routes.js.
import authRoutes from "./routes/auth.routes.js";
// Importa las rutas relacionadas con las órdenes desde el archivo ordenes.routes.js.
import ordenesRoutes from './routes/ordenes.routes.js';
// Importa las nuevas rutas para los reportes.
import reportesRoutes from './routes/reportes.routes.js';
// Importa cors, un middleware para habilitar el Cross-Origin Resource Sharing (CORS).
import cors from "cors";


// --- INICIALIZACIÓN DE LA APLICACIÓN ---
// Se crea una instancia de la aplicación Express.
const app = express();
// Creamos un servidor HTTP a partir de la app de Express
const server = http.createServer(app);
// Creamos una instancia de Socket.IO y la conectamos al servidor HTTP
const io = new SocketServer(server, { cors: { origin: "http://localhost:5173" } });

// --- CONFIGURACIÓN DE MIDDLEWARES ---
// Habilita CORS para permitir que el frontend (en http://localhost:5173) se comunique con este servidor.
// Sin esto, el navegador bloquearía las peticiones por seguridad.
const allowedOrigins = [
  "http://localhost:5173", // Desarrollo local
  "https://front-production-1543.up.railway.app" // Producción en Railway
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite solicitudes sin "origin" (por ejemplo, desde Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS no permitido desde: " + origin));
    }
  },
  credentials: true,
}));

// Usa Morgan en modo 'dev' para mostrar logs de peticiones concisos y coloreados en la consola.
app.use(morgan("dev"));
// Habilita el middleware de Express para analizar cuerpos de peticiones en formato JSON.
// Esto permite acceder a los datos enviados en el body de peticiones POST, PUT, etc., a través de `req.body`.
app.use(express.json());
// Usa el middleware cookie-parser para poder leer y escribir cookies en el navegador del cliente.
app.use(cookieParser());

// Hacemos que 'io' sea accesible desde los controladores
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Lógica de Socket.IO
io.on('connection', (socket) => {
  console.log('🔌 Nuevo cliente conectado:', socket.id);

  socket.on('disconnect', () => console.log('🔌 Cliente desconectado:', socket.id));
});

// --- MONTAJE DE RUTAS ---
// Monta las rutas de autenticación bajo el prefijo '/api'.
// Todas las rutas definidas en authRoutes (ej. /register) serán accesibles como /api/register.
app.use('/api', authRoutes);
// Monta las rutas de órdenes bajo el mismo prefijo '/api'.
// Todas las rutas en ordenesRoutes (ej. /ordenes) serán accesibles como /api/ordenes.
app.use('/api', ordenesRoutes);
// Monta las rutas de reportes.
app.use('/api', reportesRoutes);

// Exportamos el servidor en lugar de la app para que index.js lo inicie
export { server };

// --- EXPORTACIÓN ---
// Exporta la instancia de la aplicación 'app' para que pueda ser utilizada por otros archivos (como index.js para iniciar el servidor).
export default app;
