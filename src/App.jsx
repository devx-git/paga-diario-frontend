import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import BuyPlan from "./pages/BuyPlan";
import Payment from "./pages/Payment";
import UserProfile from "./pages/UserProfile";
import AdminPanel from "./pages/AdminPanel";
import PlanFinalizado from "./components/user/PlanFinalizado";
import AdminMetrics from "./components/admin/AdminMetrics";
import AdminUsers from "./components/admin/AdminUsers";
import AdminPlans from "./components/admin/AdminPlans";
import AdminWithdrawals from "./components/admin/AdminWithdrawals";
import Layout from "./components/Layout"; // ✅ nuevo


function App() {
  return (
    <Routes>
      <Route element={<Layout />}> {/* ✅ envolviendo rutas */}
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/comprar" element={<BuyPlan />} />
      <Route path="/pago" element={<Payment />} />
      <Route path="/plan-finalizado" element={<PlanFinalizado />} />
      <Route path="/perfil/*" element={<PrivateRoute><Perfil /></PrivateRoute>} />

      {/* ✅ Panel Admin con subrutas */}
      <Route path="/admin/*" element={<PrivateRoute><AdminPanel /></PrivateRoute>}>
        <Route path="metrics" element={<AdminMetrics />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="withdrawals" element={<AdminWithdrawals />} />
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
