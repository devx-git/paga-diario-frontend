import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate("/login"); // 👈 redirige al login después de cerrar sesión
    };


  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">logo</Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <div className={`flex-col md:flex md:flex-row md:space-x-6 ${isOpen ? "flex" : "hidden"}`}>
          {!token ? (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="hover:text-gray-200">Registro</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="hover:text-gray-200">Cerrar sesión</button>
          )}
        </div>

      </div>
    </nav>
  );
}
