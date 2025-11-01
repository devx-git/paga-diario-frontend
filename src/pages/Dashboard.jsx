import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Dashboard() {
  const [planes, setPlanes] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("❌ No estás autenticado");
      return;
    }

    axiosClient.get("/api/planes", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPlanes(res.data))
    .catch(() => setMsg("❌ Error al cargar los planes"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Planes disponibles</h2>
      {msg && <p>{msg}</p>}
      <ul>
        {planes.map(plan => (
          <li key={plan.id} className="mb-2 border p-2 rounded">
            <strong>{plan.nombre}</strong> - {plan.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}
