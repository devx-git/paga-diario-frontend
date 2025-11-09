import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PlanesChart({ planes }) {
  // Agrupar por nivel
  const conteoPorNivel = planes.reduce((acc, plan) => {
    const nivel = `Llave ${plan.nivel}`;
    acc[nivel] = (acc[nivel] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(conteoPorNivel);
  const data = Object.values(conteoPorNivel);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Cantidad de planes",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.6)", // azul
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h4 className="text-lg font-semibold mb-2">Distribución por nivel de planes</h4>
      <Bar data={chartData} options={options} />
    </div>
  );
}
