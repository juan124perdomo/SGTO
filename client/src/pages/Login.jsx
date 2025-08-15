import { useEffect } from "react";
import '../style/Login.css';
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
    // Hook de efecto para cambiar el fondo de la página cuando el componente se monta.
    useEffect(() => {
    // Color de respaldo (fallback)
    document.body.style.background = "#ff0000";
    // Gradiente
    document.body.style.backgroundImage =
      "linear-gradient(90deg, #ff0000, #ff00ff, #8d00f1)";

    // La función de retorno de useEffect se ejecuta cuando el componente se desmonta.
    // Se usa para limpiar los estilos del body.
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundImage = "";
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez (al montar).

  // Hook `useForm` de react-hook-form para manejar el estado y validación del formulario.
  const {register, handleSubmit, formState: { errors }} = useForm();
  // Se extraen las funciones y estados necesarios del contexto de autenticación.
  const {signin, errors: signinErrors, successMessage} = useAuth();
 

  // Función que se ejecuta al enviar el formulario.
  // `handleSubmit` de react-hook-form valida el formulario antes de llamar a `signin`.
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
 

  return (
    <div>
     <form onSubmit={onSubmit}>
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
        
        <h1>Iniciar Sesión</h1>

        {/* Campos del formulario */}
        <input type="text" placeholder="Correo electronico" {...register("email", { required: true })} />
        {errors.email && <span>Este campo es requerido</span>}
        <input type="password" placeholder="Contraseña" {...register("password", { required: true })} />
        {errors.password && <span>Este campo es requerido</span>}
        
        <button type="submit">Iniciar Sesión</button>
        <Link className="link" to="/register">No tienes cuenta? Registrate</Link>
      </form>
    </div>


  )
}

export default Login
