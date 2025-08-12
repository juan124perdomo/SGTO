import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import  authRoutes from "./routes/auth.routes.js";
import ordenesRoutes from './routes/ordenes.routes.js'; // ajusta la ruta si es diferente // ajusta la ruta si es necesario
import cors from "cors";


const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(morgan("dev"));
app.use(express.json()); // <-- Añadir esta línea
app.use(cookieParser());
app.use('/api',authRoutes);
app.use('/api', ordenesRoutes);

export default app;
