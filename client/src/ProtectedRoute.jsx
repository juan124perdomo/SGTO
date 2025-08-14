import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // Ahora recibimos 'loading' y 'isAuthenticated' del contexto.
  const { isAuthenticated, loading } = useAuth();

  // Si aún estamos cargando el estado de autenticación, mostramos un mensaje o null.
  // Esto evita que la redirección se active prematuramente.
  if (loading) return <h1>Cargando...</h1>;

  // Una vez que la carga ha terminado, verificamos si el usuario está autenticado.
  // Si no lo está, lo redirigimos a la página de login.
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si el usuario está autenticado, renderizamos el componente hijo de la ruta.
  return <Outlet />;
}

export default ProtectedRoute;
