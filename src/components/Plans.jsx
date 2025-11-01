import { Link } from "react-router-dom";

export default function Plans() {
  const plans = Array.from({ length: 10 }, (_, i) => {
    const base = 100 * (i + 1);
    return {
      nivel: i + 1,
      inversion: base,
      mensual: base * 0.4,
    };
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Nuestros Planes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <div key={plan.nivel} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Nivel {plan.nivel}</h3>
            <p>Inversión: ${plan.inversion}</p>
            <p>Ganancia mensual: ${plan.mensual}</p>
            <Link
              to="/comprar"
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
              Invertir
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
