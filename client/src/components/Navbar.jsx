import { Link } from "react-router-dom";
import './Navbar.css';
import { useAuth } from "../context/AuthContext";
import UsuarioImg from "../assets/Usuario.png";



function Navbar() {
  // Este componente Navbar es un menú de navegación simple que contiene enlaces a las páginas de inicio, inicio de sesión y registro.
        const {isAutenticated,logout, user } = useAuth();
  return (
    <>
      <nav>
        <Link to="/">SGTO</Link>
        <ul>
      {isAutenticated ? (
         <>
         
          <li><Link to="/ordenes">Inicio</Link></li>
          <li><Link to="/orden/new">Nueva Orden</Link></li>
          
          <li className="user" ><Link to="/profile">{user.username}</Link></li>

          <li><Link to="/" onClick={() => {logout();}}  >Cerrar Sesión</Link></li>

          </>
      ):(
      <>
      <li><Link to="/login">Iniciar seccion</Link></li>

      <li><Link to="/register">Registrarse</Link></li>
      </>
    )}

          
          </ul>
      </nav>
    </>
  )
}

export default Navbar
