import { useForm } from "react-hook-form";
import '../style/Register.css';
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Register() {

  // Hook de efecto para cambiar el fondo de la página cuando el componente se monta.
  useEffect(() => {
    document.body.style.background = "#00e1ff";
    document.body.style.backgroundImage = "linear-gradient(90deg, rgba(0,225,255,1) 0%, rgba(57,0,171,1) 100%)";
    
    // La función de retorno de useEffect se ejecuta cuando el componente se desmonta.
    // Se usa para limpiar los estilos del body y evitar que afecten a otras páginas.
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundImage = "";
    };
  }, []); // El array de dependencias vacío asegura que el efecto se ejecute solo una vez.

  // Hook `useForm` de la librería react-hook-form para manejar el estado y la validación del formulario.
  const { register, handleSubmit, formState: { errors } } = useForm();
  // Se utiliza el hook `useAuth` para acceder al contexto de autenticación.
  // `signup`: función para registrar un usuario.
  // `isAutenticated`: booleano que indica si el usuario está autenticado.
  // `registerErrors`: array con errores que vienen del backend durante el registro.
  const { signup, isAutenticated, errors: registerErrors } = useAuth();
  // Hook `useNavigate` de react-router-dom para la navegación programática.
  const navigate = useNavigate();



  // Hook de efecto que se ejecuta cuando el estado de `isAutenticated` cambia.
  useEffect(() => {
    // Si el usuario está autenticado, se le redirige a la página de "/ordenes".
    if (isAutenticated) navigate("/ordenes");
  }, [isAutenticated, navigate]);

  // Función que se ejecuta al enviar el formulario.
  // `handleSubmit` es una función de react-hook-form que primero valida los campos
  // y luego, si todo es correcto, ejecuta la función que se le pasa como argumento.
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* Se mapean y muestran los errores de registro que vienen del backend. */}
        {registerErrors.map((error, i)=>(
      <div className="errores" key={i}>
        {error}
      </div>
    ))}
        <h1>Registrarse</h1>
        {/* Campos del formulario de registro. `register` los vincula con react-hook-form. */}
        <input type="text" placeholder="Nombre" {...register("username", { required: true })} />
        {errors.username && <span>Este campo es requerido</span>}
        <input type="text" placeholder="Correo electronico" {...register("email", { required: true })} />
        {errors.email && <span>Este campo es requerido</span>}
        <input type="password" placeholder="Contraseña" {...register("password", { required: true })} />
        {errors.password && <span>Este campo es requerido</span>}
        <input type="text" placeholder="Telefono" {...register("telefono", { required: true })} />
        {errors.telefono && <span>Este campo es requerido</span>}

        <button type="submit">Registrarse</button>
        {/* Enlace para ir a la página de login si el usuario ya tiene una cuenta. */}
        <Link className="link" to="/login">Ya tienes cuenta? Inicia sesion</Link>
      </form>
    </>
  );
}

export default Register;
