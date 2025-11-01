import { useState } from "react";
import UserInfo from "../components/user/UserInfo";
import UserPayments from "../components/user/UserPayments";
import UserHistory from "../components/user/UserHistory";

export default function UserProfile() {
  const [view, setView] = useState("perfil");

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mi Cuenta</h2>
      <nav className="flex gap-4 mb-6 flex-wrap">
        <button onClick={() => setView("perfil")}>👤 Perfil</button>
        <button onClick={() => setView("pagos")}>💳 Pagos</button>
        <button onClick={() => setView("historial")}>📜 Historial</button>
      </nav>

      {view === "perfil" && <UserInfo />}
      {view === "pagos" && <UserPayments />}
      {view === "historial" && <UserHistory />}
    </div>
  );
}
