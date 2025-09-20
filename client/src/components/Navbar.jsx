import { Link } from "react-router-dom";
import '../style/Navbar.css';
import { useAuth } from "../context/useAuth";
import { useOrdenes } from "../context/OrdenContext";
import { useEffect, useState } from "react";
import io from 'socket.io-client';



function Navbar() {
  // Este componente Navbar es un menú de navegación simple que contiene enlaces a las páginas de inicio, inicio de sesión y registro.
        const [isOpen, setIsOpen] = useState(false);
        const {isAutenticated,logout, user } = useAuth();
        const { clearOrdenes } = useOrdenes();

  useEffect(() => {
    if (isAutenticated && user) {
      const socket = io("http://localhost:3000");

      socket.on('ordenAsignada', (data) => {
        // Si la orden fue asignada a ESTE técnico, mostramos una alerta.
        if (data.tecnicoId === user.id) {
          alert(`¡Nueva orden asignada! Título: "${data.orden.title}"`);
          // Aquí podrías usar una librería de notificaciones más elegante como react-toastify
        }
      });

      // Limpiamos la conexión al desmontar el componente
      return () => {
        socket.disconnect();
      };
    }
  }, [isAutenticated, user]);

  return (
    <nav className="main-nav">
      <h1>SGTO</h1>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* Añadimos la clase 'open' cuando el menú está abierto */}
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
      {isAutenticated ? (
         <>
          <li><Link className="link-item" to="/ordenes">Mis Órdenes</Link></li>
          {/* Solo los clientes (1) y admins (2) pueden ver el botón de crear orden */}
          {(user?.roleId === 1 || user?.roleId === 2) && (
            <li><Link to="/orden/new" className="btn-new-orden">Crear Orden</Link></li>
          )}
          {/* Mostrar enlace al panel de admin solo si el rol es 2 (Admin) */}
          {user?.roleId === 2 && (
            <>
              <li><Link className="link-item" to="/admin/dashboard">Panel de Administrador</Link></li>
              <li><Link className="link-item" to="/admin/users">Gestionar Usuarios</Link></li>
            </>
          )}
          {/* Mostrar enlace a Reportes solo si es Admin (2) o Técnico (3) */}
          {(user?.roleId === 2 || user?.roleId === 3) && (
            <li><Link className="link-item" to="/reportes">Reportes</Link></li>
          )}
          <li className="user-menu" >
            <Link to="/profile" id="perfil">Perfil</Link>
            <Link to="/" onClick={() => {
              logout();
              clearOrdenes();
            }} className="btn-logout">Cerrar Sesión</Link>
          </li>
          </>
      ):(
      <>
        <li><Link to="/login">Iniciar Sesión</Link></li>

 <li><Link to="/register">Registrarse</Link></li> </>
    )}
      </ul>
    </nav>
  )
}

export default Navbar
