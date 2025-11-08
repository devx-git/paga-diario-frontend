import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function Historial() {
  const { token, user } = useAuth();
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const endpoint = user?.rol === "admin" ? "/api/pagos/admin" : "/api/pagos/mis-pagos";
        const res = await axiosClient.get(endpoint, {
           headers: { Authorization: `Bearer ${token}` },
         });
        setPlanes(res.data);
      } catch (error) {
        console.error("Error al cargar historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [token]);

  return (
    <div className="bg-white shadow-md rounded p-6 overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Planes finalizados</h2>


      {loading ? (
        <p className="text-gray-500">Cargando historial...</p>
      ) : planes.length === 0 ? (
        <p className="text-gray-500">No se encontraron planes finalizados.</p>
      ) : (
        <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Inversión</th>
              <th className="px-4 py-2">Ganancia</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {planes.map((plan) => (
              <tr key={plan.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-xs sm:text-sm">{new Date(plan.fechaFinal).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-xs sm:text-sm">Llave {plan.nivel}</td>
                <td className="px-4 py-2 text-xs sm:text-sm">${plan.inversion}</td>
                <td className="px-4 py-2 text-xs sm:text-sm">${plan.ganancia}</td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs sm:text-sm">
                    Retirar
                  </button>
                  <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-xs sm:text-sm">
                    Invertir
                  </button>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs sm:text-sm">
                    Reinvertir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
