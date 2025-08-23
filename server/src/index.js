// Se importa la instancia de la aplicación Express desde el archivo app.js.
// 'app' ya contiene toda la configuración de middlewares y rutas.
import app from "./app.js"
import { connectDB } from "./db.js";
import { PORT } from "./config.js";

// Se ejecuta la función para establecer la conexión con la base de datos MongoDB.
connectDB();
// Se pone en marcha el servidor para que escuche las peticiones entrantes en el puerto 3000.

app.listen(PORT);
// Se imprime un mensaje en la consola para confirmar que el servidor se ha iniciado correctamente y está escuchando.
console.log("Escuchando por el puerto  3000");
