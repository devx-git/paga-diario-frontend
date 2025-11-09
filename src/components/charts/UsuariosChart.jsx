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

export default function UsuariosChart({ usuarios }) {
  const conteoPorRol = usuarios.reduce((acc, u) => {
    acc[u.rol] = (acc[u.rol] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(conteoPorRol);
  const data = Object.values(conteoPorRol);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Usuarios por rol",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
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
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h4 className="text-lg font-semibold mb-2">Distribución de usuarios por rol</h4>
      <Bar data={chartData} options={options} />
    </div>
  );
}
