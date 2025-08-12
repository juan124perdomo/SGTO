import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";

// Aquí lo creas y lo exportas con nombre
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Error en signup:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user }}>
      {children}
    </AuthContext.Provider>
  );
};
