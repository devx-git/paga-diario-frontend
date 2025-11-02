import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

export default function BuyPlan() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const plans = Array.from({ length: 10 }, (_, i) => {
    const base = 100 * (i + 1);
    return {
      id: i + 1,
      nivel: i + 1,
      inversion: base,
      mensual: base * 0.4,
    };
  });

  const handleBuy = async (planId) => {
  try {
    const res = await axiosClient.post("/api/compras", { planId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("✅ Compra exitosa:", res.data);
    // Aquí puedes mostrar un mensaje o actualizar el historial
  } catch (error) {
    console.error("❌ Error al comprar:", error.response?.data?.message || error.message);
  }
};

  const seleccionarPlan = async (plan) => {
    try {
      // Aquí podrías guardar la selección temporalmente o redirigir con parámetros
      navigate(`/pago?nivel=${plan.nivel}&inversion=${plan.inversion}`);
    } catch {
      setMsg("❌ Error al seleccionar plan");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Selecciona tu plan</h2>
      {msg && <p className="mb-4 text-red-500">{msg}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <div key={plan.nivel} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Nivel {plan.nivel}</h3>
            <p>Inversión: ${plan.inversion}</p>
            <p>Ganancia mensual: ${plan.mensual}</p>
            <button
              onClick={() => handleBuy(plan.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Comprar Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
