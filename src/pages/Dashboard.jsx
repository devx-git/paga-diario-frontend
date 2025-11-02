import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Dashboard() {
  const [planes, setPlanes] = useState([]);
  const [msg, setMsg] = useState("");

  // ✅ Aquí va la función comprarPlan
  const comprarPlan = async (planId) => {
    const token = localStorage.getItem("token");
    try {
      await axiosClient.post("/api/compras", { planId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg("✅ Plan comprado exitosamente");
    } catch (err) {
      setMsg("❌ Error al comprar el plan");
    }
  };

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
    <div className="min-h-screen bg-[#0F172A] text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#D4AF37]">Planes disponibles</h2>
      {msg && <p className="text-center mb-4">{msg}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {planes.map(plan => (
          <div key={plan.id} className="bg-[#1E3A8A] p-4 rounded shadow text-center">
            <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">{plan.nombre}</h3>
            <p>Inversión: <strong>${plan.inversion}</strong></p>
            <p>Ganancia mensual: <strong>${plan.ganancia}</strong></p>
            <p>Goteo diario: <strong>${plan.diario}</strong></p>
            <p>Total acumulado: <strong>${plan.total}</strong></p>
            <button
              className="mt-3 bg-[#D4AF37] text-[#0F172A] px-4 py-2 rounded font-semibold"
              onClick={() => comprarPlan(plan.id)}
            >
              Comprar Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
