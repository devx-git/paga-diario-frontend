import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import CountdownTimer from "./CountdownTimer";

export default function PlanStatus() {
  const { token } = useAuth();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosClient.get("/api/planes/activo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlan(res.data);
    };
    fetch();
  }, []);

  if (!plan) return null;

  const fechaInicio = new Date(plan.fechaInicio);
  const fechaFin = new Date(fechaInicio);
  fechaFin.setDate(fechaInicio.getDate() + 30);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-xl font-semibold mb-2">Plan activo</h3>
      <p><strong>Nivel:</strong> {plan.nivel}</p>
      <p><strong>Inversión:</strong> ${plan.inversion}</p>
      <p><strong>Inicio:</strong> {fechaInicio.toLocaleDateString()}</p>
      <p><strong>Fin:</strong> {fechaFin.toLocaleDateString()}</p>
      <CountdownTimer targetDate={fechaFin} />
    </div>
  );
}
