import './App.css';
import Login from "./components/login"; // Corregido: El nombre del archivo es con 'L' mayúscula

function App() {
  return (
    <>
      <div className="login_register">
        {/* Corregido: Los componentes en React deben empezar con mayúscula */}
        <Login />

        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default App;
