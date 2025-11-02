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
        <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-[#0F172A] text-white">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] mb-4 animate-fade-in">
            Tu dinero, En Tus Manos Todos Los Dias 💰
          </h1>
          <p className="text-lg text-gray-300 max-w-xl animate-fade-in delay-200">
            Descubre una nueva forma de manejar tu dinero, seguridad
            y control diario, tú decides como avanzar hacia tus metas.
          </p>
          <Link
            to="/register"
            className="mt-6 bg-[#1E3A8A] hover:bg-[#243ea3] text-white px-6 py-2 rounded transition"
          >
            Comenzar ahora
          </Link>
        </section>

        {/* Planes */}
        <section className="max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Nuestras Llaves</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {planes.map((plan) => (
              <div
                key={plan.nivel}
                className="border border-[#1E3A8A] p-4 rounded shadow hover:shadow-lg transition transform hover:-translate-y-1 bg-[#0F172A] text-white text-center"
              >
                <h3 className="text-lg font-semibold mb-2 text-[#D4AF37]">Llave {plan.nivel}</h3>
                <p className="text-gray-300">Inversión Inicial: <strong>${plan.inversion}</strong></p>
                <p className="text-gray-300">Ganancia mensual(40%): <strong>${plan.ganancia}</strong></p>
                <Link
                  to="/comprar"
                  className="mt-4 inline-block bg-[#1E3A8A] hover:bg-[#243ea3] text-white px-4 py-2 rounded"
                >
                  Comprar Plan
                </Link>
              </div>
            ))}
          </div>
        </section>
        {/* Cómo Funciona */}
        <section className="bg-[#0F172A] text-white py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-[#D4AF37]">Cómo Funciona</h2>
            <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-gray-300">
              Un proceso simple de tres pasos para comenzar a construir tu futuro.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Crea Tu Cuenta",
                  desc: "Regístrate en minutos para comenzar tu viaje de inversión con una cuenta segura y personalizada.",
                },
                {
                  title: "Elige Tu Plan",
                  desc: "Selecciona entre nuestra gama de planes de inversión diseñados para adaptarse a tus metas financieras y apetito de riesgo.",
                },
                {
                  title: "Observa Crecer Tu Riqueza",
                  desc: "Nuestro sistema automatizado rastrea tus ganancias diarias, permitiéndote ver tus ganancias acumularse en tiempo real.",
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="mb-4">
                    <span className="inline-block bg-[#D4AF37] text-[#0F172A] rounded-full p-4 text-xl font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#D4AF37]">{step.title}</h3>
                  <p className="text-gray-300">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>


      </main>

      <Footer />
    </div>
  );
}
