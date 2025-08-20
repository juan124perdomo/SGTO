import React from 'react'
import { useEffect } from 'react';
import '../style/Homepage.css';
import { Link } from "react-router-dom";




function Homepage() {

  useEffect(() => {
  // Color de respaldo (fallback)
  document.body.style.background = "#000000";

  // Gradiente lineal (con soporte para navegadores que usan -webkit-)
  document.body.style.backgroundImage =
    "linear-gradient(90deg, #000000, #0d1521, #070e18)";
}, []);

  

  return (

    <>
      <div className="container">
        <h1>Sistema de Gestión de Órdenes de Trabajo</h1>
        <p>Bienvenido al Sistema de Gestión de Órdenes de Trabajo.
          Administra, supervisa y ejecuta tus órdenes de manera eficiente y en tiempo real.</p>
          <div className="botones">
            <Link className='boton-l' to="/login">Iniciar Sesión</Link>
            <Link className='boton-r' to="/register">Registrarse</Link>
          </div>
      </div>
    </>
  )
}

export default Homepage
