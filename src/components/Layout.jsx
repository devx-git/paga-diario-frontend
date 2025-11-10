import Header from "./Header";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> {/* ✅ solo escritorio */}
      <Navbar /> {/* ✅ solo móvil */}
      <main className="pt-4 md:pt-20 px-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
