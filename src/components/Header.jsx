import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
            Paga Diario
        </Link>

        <nav className="flex gap-4 items-center text-sm sm:text-base">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <Link to="/comprar" className="hover:text-blue-600">Planes</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/perfil" className="hover:text-blue-600">Perfil</Link>
              {user.rol === "admin" && (
                <Link to="/admin" className="hover:text-blue-600">Admin</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Ingresar</Link>
              <Link to="/register" className="hover:text-blue-600">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
