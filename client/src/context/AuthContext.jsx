// Se importan los hooks de React necesarios.
import { createContext, useState, useContext, useEffect } from "react";
// Se importan las funciones que hacen las peticiones a la API del backend.
import { registerRequest, loginRequest, verityTokenRequest, getProfileRequest } from "../api/auth";
import Cookies from "js-cookie";


// Se crea el contexto de autenticación. Este contexto permitirá compartir el estado
// y las funciones de autenticación a través de toda la aplicación.
export const AuthContext = createContext();

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
      await registerRequest(user);
      
      // Después del registro exitoso, obtenemos el perfil completo
      const profileRes = await getProfileRequest();
      setUser(profileRes.data);
      setIsAutenticated(true);
      setSuccessMessage("Usuario registrado con éxito."); // Mensaje de éxito genérico
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
      await loginRequest(user);

      // Después del login exitoso, obtenemos el perfil completo
      const profileRes = await getProfileRequest();
      setUser(profileRes.data);
      setIsAutenticated(true);
      setSuccessMessage("Inicio de sesión exitoso."); // Mensaje de éxito genérico
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
      // Limpiamos los estados de otros contextos si es necesario aquí.
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
        const verifyRes = await verityTokenRequest(cookies.token);
        
        if (!verifyRes.data)  {
          setIsAutenticated(false);
          setLoading(false);
          return;
        } 

        // Si el token es válido, obtenemos el perfil completo
        const profileRes = await getProfileRequest();
        setUser(profileRes.data);
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
