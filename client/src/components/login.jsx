import { Link } from "react-router-dom";
import React from 'react';  
import '../style/login.css'; // Importamos los estilos específicos del login

function Login() {



return (
    <div className="login-container">
    <form >
        <h2>Iniciar Sesión</h2>

        <label>Correo electrónico
        <input
            type="email"
            placeholder="Correo electrónico"
            required
        />
        </label>

        <label>Contraseña
        <input
            type="password"
            placeholder="Contraseña"
            
            required
        />
        </label>

        <button className="enviar" type="submit">Acceso</button>
        <Link to="/register" className="registrar-btn">
          Registrarte
        </Link>
    </form>
    </div>
);
}

export default Login;
