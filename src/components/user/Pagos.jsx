import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function Pagos() {
  const { token } = useAuth();
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await axiosClient.get("/api/pagos/mis-pagos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPagos(res.data);
      } catch (error) {
        console.error("Error al cargar pagos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPagos();
  }, [token]);

  return (
    <div className="bg-white shadow-md rounded p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Pagos realizados</h2>

      {loading ? (
        <p className="text-gray-500">Cargando pagos...</p>
      ) : pagos.length === 0 ? (
        <p className="text-gray-500">No se encontraron pagos registrados.</p>
      ) : (
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Método</th>
              <th className="px-4 py-2">Referencia</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Nombre</th> {/* ✅ corregido */}
              <th className="px-4 py-2">Celular</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.id} className="border-b hover:bg-gray-50">
                 <td className="px-4 py-2">{new Date(pago.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 capitalize">{pago.metodo}</td>
                <td className="px-4 py-2">{pago.referencia}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white ${pago.estado === "aprobado" ? "bg-green-600" : "bg-yellow-500"}`}>
                    {pago.estado}
                  </span>
                </td>
                <td className="px-4 py-2">{pago.nombre}</td>
                <td className="px-4 py-2">{pago.celular}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
