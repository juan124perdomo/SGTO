import { useAuth } from "./context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const { loading, isAutenticated, user } = useAuth();
  const ROLES = { ADMIN: 2 };

  if (loading) return <h1>Loading...</h1>;

  if (!loading && (!isAutenticated || user.roleId !== ROLES.ADMIN)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
