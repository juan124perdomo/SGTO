import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";

// Aquí lo creas y lo exportas con nombre
const AuthContext = createContext();

export const useAuth = () => {
   const context = useContext(AuthContext);
  if (!context){
    throw new Error("useAuth must be used within an AuthProvider");
  };
  return context;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAutenticated, setIsAutenticated] = useState(false);
  const [errors, setError] = useState([]);


  const signup = async (user) => {
  try {
    const res = await registerRequest(user);
    console.log(res.data);
    setUser(res.data);
    setIsAutenticated(true);
    setError([]); // Limpia errores si todo salió bien
  } catch (error) {
    let payload = error.response?.data;

    // Normaliza para que siempre sea un array de strings
    if (Array.isArray(payload)) {
      setError(payload);
    } else if (typeof payload === "string") {
      setError([payload]);
    } else if (payload?.message) {
      setError([payload.message]);
    } else {
      setError(["Ocurrió un error inesperado"]);
    }
  }
};


  return (
    <AuthContext.Provider value={{ signup, user, isAutenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
