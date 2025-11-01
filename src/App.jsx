import Homepage from "./pages/Homepage"; // ✅ Importar
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BuyPlan from "./pages/BuyPlan";
import Payment from "./pages/Payment";
import UserProfile from "./pages/UserProfile";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} /> {/* Página principal */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/comprar" element={<BuyPlan />} />
      <Route path="/pago" element={<Payment />} />
      <Route path="/perfil" element={<UserProfile />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
