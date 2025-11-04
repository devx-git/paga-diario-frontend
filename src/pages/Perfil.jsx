import { useAuth } from "../context/AuthContext";
import { Link, Routes, Route } from "react-router-dom";
import Pagos from "../components/user/Pagos";
import Historial from "../components/user/Historial";

export default function Perfil() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Mi Cuenta 👤</h1>

      {/* Navegación entre secciones */}
      <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
        <Link to="/perfil" className="bg-blue-600 text-white px-4 py-2 rounded mb-2 md:mb-0 hover:bg-blue-700 text-center">
          Perfil
        </Link>
        <Link to="/perfil/pagos" className="bg-blue-600 text-white px-4 py-2 rounded mb-2 md:mb-0 hover:bg-blue-700 text-center">
          Pagos
        </Link>
        <Link to="/perfil/historial" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">
          Historial
        </Link>
      </div>

      {/* Contenido dinámico según ruta */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-xl font-semibold mb-4">Información personal</h2>
              <div className="space-y-2">
                <p><strong>Correo:</strong> {user?.correo || "No disponible"}</p>
                <p><strong>Rol:</strong> {user?.rol || "No disponible"}</p>
              </div>
            </div>
          }
        />
        <Route path="pagos" element={<Pagos />} />
        <Route path="historial" element={<Historial />} />
      </Routes>
    </div>
  );
}
