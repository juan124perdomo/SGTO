import { Link } from "react-router-dom";
import React from 'react';  
import '../style/register.css';

function Register() {
  return (
    <>
      
    <form >
        <h2>Registrate</h2>

        <label>Nombre completo
        <input
            type="text"
            placeholder="Nombre completo"
            required
        />
        </label>

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
        <label>Telefono
        <input
            type="text"
            placeholder="Telefono"
            
            required
        />
        </label>

        <button className="enviar" type="submit">Registrate</button>
        <Link to="../" className="login-btn"> ¿Ya tienes cuenta?</Link>
    </form>
   
    </>
);
}

export default Register; // 👈 Esto es lo que falta o está mal
