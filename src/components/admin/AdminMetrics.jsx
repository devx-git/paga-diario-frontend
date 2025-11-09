import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import UsuariosChart from "../charts/UsuariosChart";



export default function AdminMetrics() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [msg, setMsg] = useState("");
  const [usuarios, setUsuarios] = useState([]);


  const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
  const fetchUsuarios = async () => {
    try {
      const res = await axiosClient.get("/api/users", { headers });
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };
  const fetchStats = async () => {
    try {
      const res = await axiosClient.get("/api/admin/stats", { headers });
      setStats(res.data);
    } catch (error) {
      setMsg("❌ Error al cargar métricas");
    }
  };

  fetchUsuarios();
  fetchStats();
}, []);

  if (!stats || usuarios.length === 0) {
  return <p className="text-center p-4">Cargando métricas...</p>;
}


  return (
    <div className="max-w-5xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Métricas del sistema</h3>
      {msg && <p className="mb-4 text-red-500">{msg}</p>}

      {usuarios.length > 0 && <UsuariosChart usuarios={usuarios} />}
       
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Usuarios activos", value: stats.usuariosActivos },
            { title: "Total pagado en retiros", value: `$${stats.totalPagado}` },
            { title: "Ganancias acumuladas", value: `$${stats.ganancias}` },
            { title: "Planes activos", value: stats.planesActivos },
            { title: "Compras realizadas", value: stats.totalCompras },
          ].map((item, i) => (
            <MetricCard key={i} title={item.title} value={item.value} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, index }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h4 className="text-lg font-semibold mb-2">
        {index + 1}. {title}
      </h4>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

