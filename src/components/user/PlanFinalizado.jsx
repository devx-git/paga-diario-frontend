import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function PlanFinalizado() {
  const { token } = useAuth();
  const [plan, setPlan] = useState(null);
  const [dias, setDias] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axiosClient.get("/api/planes/activo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data;
        setPlan(p);

        const inicio = new Date(p.fechaInicio);
        const hoy = new Date();
        const diff = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
        setDias(diff);

        const goteo = (p.inversion * 0.4) / 30;
        const acumulado = Math.min(diff, 30) * goteo;
        setSaldo(acumulado);
      } catch {
        setMsg("❌ No tienes un plan activo");
      }
    };
    fetchPlan();
  }, []);

  const retirar = async () => {
    try {
      await axiosClient.post(
        "/api/retiros",
        { monto: saldo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("✅ Retiro solicitado");
    } catch {
      setMsg("❌ Error al solicitar retiro");
    }
  };

  const reinvertir = async () => {
    try {
      await axiosClient.post(
        "/api/planes/reinvertir",
        { monto: saldo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("✅ Reinversión realizada");
    } catch {
      setMsg("❌ Error al reinvertir");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tu plan ha finalizado</h2>
      {msg && <p className="mb-4 text-green-600">{msg}</p>}

      {plan && dias >= 30 ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>Plan:</strong> Nivel {plan.nivel}</p>
          <p><strong>Inversión:</strong> ${plan.inversion}</p>
          <p><strong>Saldo acumulado:</strong> ${saldo.toFixed(2)}</p>

          <div className="mt-4 grid gap-4">
            <button
              onClick={retirar}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Retirar saldo
            </button>
            <button
              onClick={reinvertir}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Reinvertir saldo
            </button>
            <button
              onClick={() => window.location.href = "/comprar"}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Invertir en otro plan
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Tu plan aún está en curso ({dias}/30 días)</p>
      )}
    </div>
  );
}
