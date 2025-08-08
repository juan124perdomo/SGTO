import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();

// Cargar variables de entorno del archivo .env
dotenv.config();

// Middlewares: Funciones que se ejecutan antes de que la petición llegue a las rutas
app.use(cors()); // Habilita CORS para permitir peticiones de otros dominios
//app.use(cookieParser()); // Parsea las cookies de las peticiones
app.use(express.urlencoded({ extended: true })); // Analiza el cuerpo de las peticiones como formulario
app.use(express.json()); // Analiza el cuerpo de las peticiones como JSON


app.get("/",(req,res)=>{
    res.send("hola mundo")
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando por el puerto ${PORT}`);
});