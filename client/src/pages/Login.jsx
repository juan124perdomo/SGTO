import {  useEffect } from "react";
import '../style/Login.css';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  // Hook `useForm` de react-hook-form para manejar el estado y validación del formulario.
  const {register, handleSubmit, formState: { errors }} = useForm();
  // Se extraen las funciones y estados necesarios del contexto de autenticación.
  const {signin, errors: signinErrors, successMessage, isAutenticated } = useAuth();
 const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario.
  // `handleSubmit` de react-hook-form valida el formulario antes de llamar a `signin`.
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
 
  useEffect(() => {
    if (isAutenticated) navigate("/ordenes"); // Redirige si ya está autenticado
  },[isAutenticated, navigate]);

  return (
    <>

      <div className="logo">
        <img src=".././../public/logo.png" alt="Logo SGTO" />
      </div>
     <form className="form-login" onSubmit={onSubmit}>
      {/* Muestra los errores de inicio de sesión que vienen del backend */}
      {signinErrors.map((error, i)=>(
      <div className="errores" key={i}>
        {error}
      </div>
    ))}

      {/* Muestra el mensaje de éxito si existe */}
      {successMessage && (
        <div className="successes">{successMessage}</div>
      )}
        
        <h1 className="login-title" >Iniciar Sesión</h1>

        {/* Campos del formulario */}
        <input className="login-input"  type="text" placeholder="Correo electronico" {...register("email", { required: true })} />
        {errors.email && <span>Este campo es requerido</span>}
        <input  className="login-input" type="password" placeholder="Contraseña" {...register("password", { required: true })} />
        {errors.password && <span>Este campo es requerido</span>}
        
        <button className="login-submit" type="submit">Iniciar Sesión</button>
        <Link className="register" to="/register">No tienes cuenta? Registrate</Link>
      </form>
    </>


  )
}

export default Login
