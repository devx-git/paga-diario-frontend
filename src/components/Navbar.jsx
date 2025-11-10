import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logo } from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNav = (path) => {
  navigate(path);
  setIsOpen(false); // ✅ cierra el menú
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
              <button onClick={() => handleNav("/")} className="block text-left w-full hover:text-gray-200">Inicio</button>
              <button onClick={() => handleNav("/login")} className="block text-left w-full hover:text-gray-200">Login</button>
              <button onClick={() => handleNav("/register")} className="block text-left w-full hover:text-gray-200">Registro</button>
            </>
          ) : (
            <>
              <button onClick={() => handleNav("/")} className="block text-left w-full hover:text-gray-200">Inicio</button>
              <button onClick={() => handleNav("/dashboard")} className="block text-left w-full hover:text-gray-200">
                Dashboard
              </button>
              <button onClick={() => handleNav("/perfil")} className="block text-left w-full hover:text-gray-200">
                Perfil
              </button>

              {user?.rol === "admin" && (
                <button onClick={() => handleNav("/admin/metrics")} className="block text-left w-full hover:text-gray-200">
                  Admin
                </button>
              )}

              <button onClick={handleLogout} className="block hover:text-gray-200">Cerrar sesión</button>
            </>
          )}
        </div>
      </div>

    </nav>
  );
}


