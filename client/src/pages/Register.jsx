import { useForm } from "react-hook-form";
import '../style/Register.css';
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Register() {

  useEffect(() => {
    document.body.style.background = "#00e1ff";
    document.body.style.backgroundImage = "linear-gradient(90deg, rgba(0,225,255,1) 0%, rgba(57,0,171,1) 100%)";
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundImage = "";
    };
  }, []);

  const { register, handleSubmit } = useForm();
  const { signup, user } = useAuth();

  // Solo log en consola cuando el usuario cambie
  useEffect(() => {
    if (user) {
      console.log("Usuario registrado:", user);
    }
  }, [user]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Registrarse</h1>

        <input type="text" placeholder="Nombre" {...register("username", { required: true })} />
        <input type="text" placeholder="Correo electronico" {...register("email", { required: true })} />
        <input type="text" placeholder="Contraseña" {...register("password", { required: true })} />
        <input type="text" placeholder="Telefono" {...register("telefono", { required: true })} />

        <button type="submit">Registrarse</button>
      </form>
    </>
  );
}

export default Register;
