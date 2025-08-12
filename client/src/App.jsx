import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ordenes" element={<Register />} />
        <Route path="/add-orden" element={<Register />} />
        <Route path="/ordenes/:id" element={<Register />} />
        <Route path="/profile" element={<Register />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
