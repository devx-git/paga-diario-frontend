import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

const AdminPagos = () => {
  const [pagos, setPagos] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
    const obtenerPagos = async () => {
      try {
        const { data } = await axiosClient.get("/api/pagos/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPagos(data);
      } catch (error) {
        console.error("Error al cargar pagos:", error);
      }
    };

    if (user.rol === "admin") obtenerPagos();
  }, [token, user]);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axiosClient.put(`/api/pagos/estado/${id}`, { estado: nuevoEstado }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPagos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pagos de todos los usuarios</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Plan</th>
            <th>Método</th>
            <th>Referencia</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.usuario?.nombre}</td>
              <td>{pago.plan?.nombre}</td>
              <td>{pago.metodo}</td>
              <td>{pago.referencia}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-white text-sm font-semibold ${
                    pago.estado === "activo"
                      ? "bg-green-600"
                      : pago.estado === "pendiente"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                >
                  {pago.estado}
                </span>
              </td>
              <td>
                <select
                  value={pago.estado}
                  onChange={(e) => cambiarEstado(pago.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="activo">Activo</option>
                  <option value="rechazado">Rechazado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPagos;
