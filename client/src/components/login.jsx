
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

        <button type="submit">Entrar</button>
        <button type="button">Registrarte</button>
    </form>
    </div>
);
}

export default Login;
