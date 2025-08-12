import { useEffect } from "react";
import '../style/Login.css';

function Login() {

    useEffect(() => {
    // Color de respaldo (fallback)
    document.body.style.background = "#ff0000";
    // Gradiente
    document.body.style.backgroundImage =
      "linear-gradient(90deg, #ff0000, #ff00ff, #8d00f1)";

    return () => {
      // Limpiar estilos al salir de Register
      document.body.style.background = "";
      document.body.style.backgroundImage = "";
    };
  }, []);


  return (
    <div>
      <form action="">
        <h1>Iniciar Sesion</h1>
        
        <input type="email" placeholder="Correo electronico" />

        <input type="password" placeholder="Contraseña" />
      
      <button type="submit">Iniciar Sesion</button>

      
      </form>
    </div>


  )
}

export default Login
