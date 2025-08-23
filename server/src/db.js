// Importa la librería Mongoose, que es una herramienta de modelado de objetos (ODM) para MongoDB y Node.js.
// Facilita la interacción con la base de datos, permitiendo definir esquemas para los datos y manejar las conexiones.
import mongoose from "mongoose";

// Define y exporta una función asíncrona llamada `connectDB`.
// Esta función se encargará de establecer la conexión con la base de datos de MongoDB.
export const connectDB = async () => {
    // Se utiliza un bloque try...catch para manejar posibles errores durante la conexión.
    try {
        // Intenta conectarse a la base de datos.
        // `await mongoose.connect(...)` pausa la ejecución de la función hasta que la promesa de conexión se resuelva.
        // La URL 'mongodb://localhost/SGOT' especifica que:
        // - El protocolo es `mongodb`.
        // - El servidor está en `localhost` (la máquina local).
        // CÓDIGO ACTUALIZADO CON LA CONEXIÓN DE ATLAS
        await mongoose.connect('mongodb+srv://juanfelipeperdomo41:L51VDoi116JTmstL@sgot.apmhiao.mongodb.net/?retryWrites=true&w=majority&appName=SGOT');
        // Si la conexión es exitosa, imprime un mensaje en la consola para confirmarlo.
        console.log(">>> Base de datos conectada");
    } catch (error) {
        // Si ocurre un error durante el intento de conexión (por ejemplo, el servidor de MongoDB no está corriendo),
        // se captura el error aquí y se imprime en la consola.
        console.log(error);
    }
};
