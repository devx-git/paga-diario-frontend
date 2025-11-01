import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminMetrics from "../components/admin/AdminMetrics";
import AdminUsers from "../components/admin/AdminUsers";
import AdminPlans from "../components/admin/AdminPlans";
import AdminWithdrawals from "../components/admin/AdminWithdrawals";

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState("metrics");

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Panel Administrativo</h2>
      <nav className="flex gap-4 mb-6">
        <button onClick={() => setView("metrics")}>📊 Métricas</button>
        <button onClick={() => setView("users")}>👥 Usuarios</button>
        <button onClick={() => setView("plans")}>📦 Planes</button>
        <button onClick={() => setView("withdrawals")}>💸 Retiros</button>
      </nav>

      {view === "metrics" && <AdminMetrics />}
      {view === "users" && <AdminUsers />}
      {view === "plans" && <AdminPlans />}
      {view === "withdrawals" && <AdminWithdrawals />}
    </div>
  );
}
