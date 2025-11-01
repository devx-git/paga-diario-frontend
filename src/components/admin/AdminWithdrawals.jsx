import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function AdminWithdrawals() {
  const { token } = useAuth();
  const [retiros, setRetiros] = useState([]);
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const retirosPerPage = 5;

  const headers = { Authorization: `Bearer ${token}` };

  const fetchRetiros = async () => {
    try {
      const res = await axiosClient.get("/api/retiros", { headers });
      setRetiros(res.data);
    } catch {
      setMsg("❌ Error al cargar retiros");
    }
  };

  useEffect(() => {
    fetchRetiros();
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await axiosClient.put(`/api/retiros/${id}`, { estado: nuevoEstado }, { headers });
      setMsg("✅ Estado actualizado");
      fetchRetiros();
    } catch {
      setMsg("❌ Error al actualizar estado");
    }
  };

  // Paginación
  const indexOfLast = currentPage * retirosPerPage;
  const indexOfFirst = indexOfLast - retirosPerPage;
  const currentRetiros = retiros.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(retiros.length / retirosPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Gestión de Retiros</h3>

      {msg && <p className="mb-4 text-green-600">{msg}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Usuario</th>
              <th className="p-2">Monto</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentRetiros.map((r) => (
              <tr key={r.id} className="text-center border-t">
                <td className="p-2">{r.usuarioCorreo}</td>
                <td className="p-2">${r.monto}</td>
                <td className="p-2">{r.estado}</td>
                <td className="p-2">{new Date(r.fecha).toLocaleDateString()}</td>
                <td className="p-2">
                  {r.estado === "pendiente" && (
                    <button
                      onClick={() => actualizarEstado(r.id, "completado")}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Marcar como completado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
