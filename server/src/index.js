import { server } from "./app.js"; // Importamos el servidor HTTP con Socket.IO
import prisma, { connectDB } from "./db.js"; // si exportaste connectDB
import { PORT } from "./config.js";

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma conectado");
    server.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Error al iniciar:", err);
    process.exit(1);
  }
}

main();
