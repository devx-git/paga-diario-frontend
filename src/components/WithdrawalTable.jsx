import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function Withdrawals() {
  const { token } = useAuth();
  const [monto, setMonto] = useState("");
  const [retiros, setRetiros] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchRetiros = async () => {
    try {
      const res = await axiosClient.get("/api/retiros", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRetiros(res.data);
    } catch {
      setMsg("❌ Error al cargar los retiros");
    }
  };

  useEffect(() => {
    fetchRetiros();
  }, []);

  const solicitarRetiro = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post(
        "/api/retiros",
        { monto },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("✅ Retiro solicitado correctamente");
      setMonto("");
      fetchRetiros();
    } catch {
      setMsg("❌ Error al solicitar retiro");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Solicitar Retiro</h2>
      <form onSubmit={solicitarRetiro} className="mb-6">
        <input
          type="number"
          placeholder="Monto a retirar"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Solicitar
        </button>
      </form>
      {msg && <p className="mb-4">{msg}</p>}

      <h3 className="text-xl font-semibold mb-2">Historial de Retiros</h3>
      <ul className="list-disc pl-5">
        {retiros.map((r) => (
          <li key={r.id}>
            ${r.monto} — Estado: {r.estado} — Fecha: {new Date(r.fecha).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
