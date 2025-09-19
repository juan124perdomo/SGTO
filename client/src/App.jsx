// Se importan los componentes necesarios de 'react-router-dom' para manejar el enrutamiento de la aplicación.
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Se importan los componentes de las páginas que se usarán en las rutas.
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import OrdenesPage from "./pages/Ordenes";
import OrdenFormPage from "./pages/OrdenForms";
import ProfilePage from "./pages/Profile";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ReportePage from "./pages/ReportePage"; // Importamos la nueva página
import ReportesListPage from "./pages/ReportesListPage"; // Importamos la lista de reportes
import UserManagementPage from "./pages/UserManagementPage"; // Importamos la página de gestión de usuarios
import ReporteFormPage from "./pages/ReporteFormPage"; // Importamos el formulario de reporte

// Se importa el AuthProvider desde el contexto de autenticación.
// Este proveedor dará acceso al estado y funciones de autenticación a toda la aplicación.
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import { OrdenProvider } from "./context/OrdenContext";
import { AdminProvider } from "./context/AdminContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrdenProvider>
          <AdminProvider>
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/ordenes" element={<OrdenesPage />} />
                  <Route path="/orden/new" element={<OrdenFormPage />} />
                  <Route path="/ordenes/:id" element={<OrdenFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/ordenes/:id/reporte" element={<ReporteFormPage />} /> {/* Nueva ruta para crear reportes */}
                  <Route path="/reportes" element={<ReportesListPage />} /> {/* Nueva ruta para la lista de reportes */}
                <Route path="/reporte/:id" element={<ReportePage />} /> {/* Nueva ruta para ver reportes */}
                </Route>

                <Route element={<AdminRoute />}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/users" element={<UserManagementPage />} />
                </Route>
              </Routes>
            </main>
          </AdminProvider>
        </OrdenProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
