import dotenv from "dotenv";
dotenv.config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "some secret key";
export const PORT = process.env.PORT || 3000;
// mantener MONGODB_URI comentado si quieres conservarlo como backup:
// export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/SGTO";
export const DATABASE_URL = process.env.DATABASE_URL || null;
