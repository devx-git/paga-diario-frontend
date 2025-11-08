import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logo } from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#0F172A] text-white shadow-lg md:hidden"> {/* ✅ solo móviles */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-32 h-auto fill-[#D4AF37] animate-fade-in" /> {/* ✅ logo dorado en fondo oscuro */}
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl z-50 relative">
          ☰
        </button>

      </div>

      <div className={`fixed top-0 left-0 h-full w-64 bg-[#0F172A] text-white transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 space-y-4">
          {!token ? (
            <>
              <Link to="/login" className="block hover:text-gray-200">Login</Link>
              <Link to="/register" className="block hover:text-gray-200">Registro</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block hover:text-gray-200">Dashboard</Link>
              <Link to="/perfil" className="block hover:text-gray-200">Perfil</Link>
              {token.rol === "admin" && (
                 <Link to="/admin/pagos" className="block hover:text-gray-200">Admin</Link>
              )}
              <button onClick={handleLogout} className="block hover:text-gray-200">Cerrar sesión</button>
            </>
          )}
        </div>
      </div>

    </nav>
  );
}
