// Se importan los hooks de React necesarios.
import { createContext, useState, useContext, useEffect } from "react";
// Se importan las funciones que hacen las peticiones a la API del backend.
import { registerRequest, loginRequest, verityTokenRequest} from "../api/auth";
import Cookies from "js-cookie";


// Se crea el contexto de autenticación. Este contexto permitirá compartir el estado
// y las funciones de autenticación a través de toda la aplicación.
const AuthContext = createContext();

export const useAuth = () => {
  // Hook personalizado para consumir el contexto de autenticación de forma más sencilla.
   const context = useContext(AuthContext);
  if (!context){
    throw new Error("useAuth must be used within an AuthProvider");
  };
  return context;
};

// El AuthProvider es un componente que envuelve a otros componentes (children)
// para proveerles el contexto de autenticación.
export const AuthProvider = ({ children }) => {
  // --- ESTADOS GLOBALES DE AUTENTICACIÓN ---
  // `user`: Almacena la información del usuario autenticado (nombre, email, etc.).
  const [user, setUser] = useState(null);
  // `isAutenticated`: Un booleano que indica si el usuario está autenticado o no. Facilita la lógica de renderizado condicional.
  const [isAutenticated, setIsAutenticated] = useState(false);
  // `errors`: Un array para almacenar los mensajes de error que vienen del backend.
  const [errors, setError] = useState([]);
  // `successMessage`: Un string para almacenar el mensaje de éxito del backend.
  const [successMessage, setSuccessMessage] = useState("");
  
  const [loading, setLoading] = useState(true)

  // --- FUNCIONES DE AUTENTICACIÓN ---

  // Función asíncrona para el registro de un nuevo usuario.
  const signup = async (user) => {
    try {
      // Llama a la API del backend para registrar al usuario.
      const res = await registerRequest(user);
      
      // Si el registro es exitoso, actualiza los estados y guarda el mensaje de éxito.
      setUser(res.data);
      setIsAutenticated(true);
      setSuccessMessage(res.data.message);
    } catch (error) {
      // Si hay un error, se captura y se actualiza el estado de errores.
      // La respuesta del backend puede venir en diferentes formatos, aquí se normaliza a un array.
      let payload = error.response?.data;
      if (Array.isArray(payload)) {
        setError(payload);
      } else if (payload?.message) {
        setError([payload.message]);
      } else {
        setError(["Ocurrió un error inesperado en el registro"]);
      }
    }
  };

  // Función asíncrona para el inicio de sesión de un usuario.
  const signin = async (user) => {
    try {
      // Llama a la API del backend para iniciar sesión.
      const res = await loginRequest(user);
      // Si el inicio de sesión es exitoso, actualiza los estados y guarda el mensaje de éxito.
      setUser(res.data);
      setIsAutenticated(true);
      setSuccessMessage(res.data.message);
    } catch (error) {
      // Si hay un error, se captura y se actualiza el estado de errores.
      let payload = error.response?.data;
      if (Array.isArray(payload)) {
        setError(payload);
      } else if (payload?.message) {
        setError([payload.message]);
      } else {
        setError(["Ocurrió un error inesperado en el inicio de sesión"]);
      }
    }
  };

  const logout = () => {
      Cookies.remove("token");
      setUser(null);
      setIsAutenticated(false);
      setSuccessMessage("Sesión cerrada exitosamente");
      setError([]);
  }

  // Este useEffect se encarga de limpiar los errores después de 5 segundos.
  useEffect(() => {
    if (errors.length > 0) {
      // Se crea un temporizador que limpiará el estado de errores.
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      // Se retorna una función de limpieza para el temporizador.
      // Esto es importante para evitar fugas de memoria si el componente se desmonta.
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Este useEffect se encarga de limpiar el mensaje de éxito después de 5 segundos.
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      // Se retorna una función de limpieza para el temporizador.
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

//Token de login

  useEffect(() => {
   async function checkLogin (){
  const cookies = Cookies.get();
    
    if (!cookies.token) {
      
      setIsAutenticated(false);
      setLoading(false);
      
      return setUser(null);
    } else {
      try {
        const res = await verityTokenRequest(cookies.token);
        console.log(res);
        
        if (!res.data)  {
          setIsAutenticated(false);
        setLoading(false);
        return;
        } 


        setUser(res.data);
        setIsAutenticated(true);
        setLoading(false);

      } catch {
      setUser(null);
      setIsAutenticated(false);
      setLoading(false);
      }

    }
    }
    checkLogin();
  }, []);
  
  return (
    // Se provee el contexto con los valores (estados y funciones) a los componentes hijos.
    // Cualquier componente envuelto por AuthProvider podrá acceder a `signup`, `user`, `isAutenticated`, `successMessage`, etc.
    <AuthContext.Provider value={{ signup, user, isAutenticated, errors, signin, successMessage, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
