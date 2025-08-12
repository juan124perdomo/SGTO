import { useForm } from "react-hook-form";
import '../style/Register.css';
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {

  //fondo de pantalla
  useEffect(() => {
    document.body.style.background = "#00e1ff";
    document.body.style.backgroundImage = "linear-gradient(90deg, rgba(0,225,255,1) 0%, rgba(57,0,171,1) 100%)";
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundImage = "";
    };
  }, []);

  //constantes
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAutenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();



  // Solo log en consola cuando el usuario cambie
  useEffect(() => {
    if (isAutenticated) navigate("/ordenes");
  }, [isAutenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <>
    
    
      <form onSubmit={onSubmit}>
        {registerErrors.map((error, i)=>(
      <div className="errores" key={i}>
        {error}
      </div>
    ))}
        <h1>Registrarse</h1>

        <input type="text" placeholder="Nombre" {...register("username", { required: true })} />
        {errors.username && <span>Este campo es requerido</span>}
        <input type="text" placeholder="Correo electronico" {...register("email", { required: true })} />
        {errors.email && <span>Este campo es requerido</span>}
        <input type="password" placeholder="Contraseña" {...register("password", { required: true })} />
        {errors.password && <span>Este campo es requerido</span>}
        <input type="text" placeholder="Telefono" {...register("telefono", { required: true })} />
        {errors.telefono && <span>Este campo es requerido</span>}


        <button type="submit">Registrarse</button>
      </form>
    </>
  );
}

export default Register;
