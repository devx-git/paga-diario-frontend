import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function UserPayments() {
  const { token } = useAuth();
  const [pagos, setPagos] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await axiosClient.get("/api/pagos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPagos(res.data);
      } catch {
        setMsg("❌ Error al cargar pagos");
      }
    };
    fetchPagos();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Pagos realizados</h3>
      {msg && <p className="text-red-500">{msg}</p>}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Fecha</th>
              <th className="p-2">Monto</th>
              <th className="p-2">Método</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((p) => (
              <tr key={p.id} className="text-center border-t">
                <td className="p-2">{new Date(p.fecha).toLocaleDateString()}</td>
                <td className="p-2">${p.monto}</td>
                <td className="p-2">{p.metodo}</td>
                <td className="p-2">{p.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
