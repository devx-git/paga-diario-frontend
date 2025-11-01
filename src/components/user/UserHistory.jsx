import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function UserHistory() {
  const { token } = useAuth();
  const [historial, setHistorial] = useState([]);
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await axiosClient.get("/api/planes/historial", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistorial(res.data);
      } catch {
        setMsg("❌ Error al cargar historial");
      }
    };
    fetchHistorial();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = historial.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(historial.length / itemsPerPage);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Historial de inversiones</h3>
      {msg && <p className="text-red-500">{msg}</p>}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nivel</th>
              <th className="p-2">Inversión</th>
              <th className="p-2">Inicio</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((h) => (
              <tr key={h.id} className="text-center border-t">
                <td className="p-2">{h.nivel}</td>
                <td className="p-2">${h.inversion}</td>
                <td className="p-2">{new Date(h.fechaInicio).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
