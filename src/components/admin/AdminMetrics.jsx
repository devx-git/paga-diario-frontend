import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function AdminMetrics() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [msg, setMsg] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosClient.get("/api/admin/stats", { headers });
        setStats(res.data);
      } catch {
        setMsg("❌ Error al cargar métricas");
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-center p-4">Cargando métricas...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Métricas del sistema</h3>
      {msg && <p className="mb-4 text-red-500">{msg}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard title="Usuarios activos" value={stats.usuariosActivos} />
        <MetricCard title="Total pagado en retiros" value={`$${stats.totalPagado}`} />
        <MetricCard title="Ganancias acumuladas" value={`$${stats.ganancias}`} />
        <MetricCard title="Planes activos" value={stats.planesActivos} />
        <MetricCard title="Compras realizadas" value={stats.totalCompras} />
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
