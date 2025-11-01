import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Homepage() {
  const planes = Array.from({ length: 10 }, (_, i) => {
    const base = 100 * (i + 1);
    return {
      nivel: i + 1,
      inversion: base,
      ganancia: base * 0.4,
      
    };
  });

  return (
    
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-blue-100 to-purple-100">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Bienvenido a Paga Diario 💰
          </h1>
          <p className="text-lg text-gray-700 max-w-xl animate-fade-in delay-200">
            Gestiona tus préstamos e inversiones de manera fácil, rápida y segura.
          </p>
          <Link
            to="/register"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Comenzar ahora
          </Link>
        </section>

        {/* Planes */}
        <section className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Planes disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {planes.map((plan) => (
              <div
                key={plan.nivel}
                className="border p-4 rounded shadow hover:shadow-lg transition transform hover:-translate-y-1 bg-white text-center"
              >
                <h3 className="text-lg font-semibold mb-2">Nivel {plan.nivel}</h3>
                <p className="text-gray-700">Inversión: <strong>${plan.inversion}</strong></p>
                <p className="text-gray-700">Ganancia mensual: <strong>${plan.ganancia}</strong></p>
                <Link
                  to="/comprar"
                  className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                  Invertir
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
