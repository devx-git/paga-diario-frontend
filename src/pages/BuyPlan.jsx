import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BuyPlan() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const plans = Array.from({ length: 10 }, (_, i) => {
    const base = 100 * (i + 1);
    return {
      nivel: i + 1,
      inversion: base,
      mensual: base * 0.4,
    };
  });

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
              onClick={() => seleccionarPlan(plan)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
