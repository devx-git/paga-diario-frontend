import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./pages/Homepage"; // ✅ Importar
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import BuyPlan from "./pages/BuyPlan";
import Payment from "./pages/Payment";
import UserProfile from "./pages/UserProfile";
import AdminPanel from "./pages/AdminPanel";
import PlanFinalizado from "./components/user/PlanFinalizado";
import AdminPagos from "./components/admin/AdminPagos";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} /> {/* Página principal */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/comprar" element={<BuyPlan />} />
      <Route path="/pago" element={<Payment />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/pagos" element={<AdminPagos />} />
      <Route path="/plan-finalizado" element={<PlanFinalizado />} />
      <Route path="/perfil/*" element={<PrivateRoute><Perfil /></PrivateRoute>} />

    </Routes>
  );
}

export default App;
