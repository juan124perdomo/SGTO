// Se importa la instancia de la aplicación Express desde el archivo app.js.
// 'app' ya contiene toda la configuración de middlewares y rutas.
import app from "./app.js"
// Se importa la función para conectar a la base de datos desde db.js.
import { connectDB } from "./db.js";

// Se ejecuta la función para establecer la conexión con la base de datos MongoDB.
connectDB();
// Se pone en marcha el servidor para que escuche las peticiones entrantes en el puerto 3000.
app.listen(3000)
// Se imprime un mensaje en la consola para confirmar que el servidor se ha iniciado correctamente y está escuchando.
console.log("Escuchando por el puerto  3000");
