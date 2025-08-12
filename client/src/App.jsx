import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <>
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ordenes" element={<h1>Ordenes</h1>} />
        <Route path="/add-orden" element={<Register />} />
        <Route path="/ordenes/:id" element={<Register />} />
        <Route path="/profile" element={<Register />} />
      </Routes>
    </Router>
      
      </AuthProvider>
    
    </>
  );
}

export default App;
