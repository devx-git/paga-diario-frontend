import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function Withdrawals() {
  const { token } = useAuth();
  const [retiros, setRetiros] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosClient.get("/api/retiros", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRetiros(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Mis Retiros</h3>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Monto</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {retiros.map((r) => (
            <tr key={r.id} className="text-center border-t">
              <td className="p-2">${r.monto}</td>
              <td className="p-2">{r.estado}</td>
              <td className="p-2">{new Date(r.fecha).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
