// Se importan los componentes necesarios de 'react-router-dom' para manejar el enrutamiento de la aplicación.
// BrowserRouter (renombrado como Router): Envuelve la aplicación para habilitar el enrutamiento.
// Routes: Contenedor para un conjunto de rutas.
// Route: Define una ruta específica y el componente que se debe renderizar.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Se importan los componentes de las páginas que se usarán en las rutas.
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ordenes from "./pages/Ordenes";
import OrdenForms from "./pages/OrdenForms";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";


// Se importa el AuthProvider desde el contexto de autenticación.
// Este proveedor dará acceso al estado y funciones de autenticación a toda la aplicación.
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { OrdenProvider } from "./context/Ordencontext";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      {/* El componente <Router> debe envolver toda la aplicación para que todos los componentes, 
        incluyendo el AuthProvider y las rutas, puedan reaccionar a los cambios de URL.
      */}
      <Router>
        {/* El AuthProvider envuelve las rutas para que los componentes que están dentro, 
          como ProtectedRoute, puedan acceder al estado de autenticación.
        */}
        <AuthProvider>
          <OrdenProvider>
            <Navbar />
          <Routes>
            {/* Cada componente Route define una ruta y el elemento que se mostrará. */}
            <Route path="/" element={<Homepage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/*
              Un <Route> que contiene otras rutas anidadas. Todas las rutas
              dentro de este contenedor requieren la autenticación proporcionada
              por ProtectedRoute.
            */}
            <Route element={<ProtectedRoute/>}>
              <Route path="/ordenes" element={<Ordenes/>} />
              <Route path="/orden/new" element={<OrdenForms/>} />
              <Route path="/ordenes/:id" element={<OrdenForms/>} />
              <Route path="/profile" element={<Profile/>} />
            </Route>
          </Routes>
          </OrdenProvider>
          </AuthProvider>
       
      </Router>
    </>
  );
}

export default App;
