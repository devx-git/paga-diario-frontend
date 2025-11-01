import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { useState } from "react";

export default function InvestmentPlans() {
  const { token } = useAuth();
  const [msg, setMsg] = useState("");

  const plans = Array.from({ length: 10 }, (_, i) => {
    const base = 100 * (i + 1);
    const mensual = base * 0.4;
    return {
      nivel: i + 1,
      inversion: base,
      mensual,
      diario: +(mensual / 30).toFixed(2),
      total: base + mensual,
    };
  });

  const comprarPlan = async (plan) => {
    try {
      await axiosClient.post(
        "/api/planes/comprar", // ajusta según tu backend
        { nivel: plan.nivel, inversion: plan.inversion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg(`✅ Plan nivel ${plan.nivel} comprado exitosamente`);
    } catch (err) {
      setMsg("❌ Error al comprar el plan");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Planes de Inversión</h2>
      {msg && <p className="mb-4 text-green-600">{msg}</p>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Nivel</th>
            <th>Inversión</th>
            <th>Ganancia mensual</th>
            <th>Goteo diario</th>
            <th>Total mensual</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.nivel} className="text-center border-t">
              <td>{plan.nivel}</td>
              <td>${plan.inversion}</td>
              <td>${plan.mensual}</td>
              <td>${plan.diario}</td>
              <td>${plan.total}</td>
              <td>
                <button
                  onClick={() => comprarPlan(plan)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Comprar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
