import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function AdminPlans() {
  const { token } = useAuth();
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ nivel: "", inversion: "" });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 5;

  const headers = { Authorization: `Bearer ${token}` };

  const fetchPlans = async () => {
    try {
      const res = await axiosClient.get("/api/plans", { headers });
      setPlans(res.data);
    } catch {
      setMsg("❌ Error al cargar planes");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!form.nivel || isNaN(form.nivel) || form.nivel < 1)
      errors.nivel = "Nivel inválido";
    if (!form.inversion || isNaN(form.inversion) || form.inversion < 100)
      errors.inversion = "Inversión mínima $100";
    return errors;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    setError({});
    try {
      if (editingId) {
        await axiosClient.put(`/api/plans/${editingId}`, form, { headers });
        setMsg("✅ Plan actualizado");
      } else {
        await axiosClient.post("/api/plans", form, { headers });
        setMsg("✅ Plan creado");
      }
      setForm({ nivel: "", inversion: "" });
      setEditingId(null);
      fetchPlans();
    } catch {
      setMsg("❌ Error al guardar plan");
    }
  };

  const handleEdit = (plan) => {
    setForm({ nivel: plan.nivel, inversion: plan.inversion });
    setEditingId(plan.id);
    setError({});
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este plan?")) return;
    try {
      await axiosClient.delete(`/api/plans/${id}`, { headers });
      setMsg("✅ Plan eliminado");
      fetchPlans();
    } catch {
      setMsg("❌ Error al eliminar plan");
    }
  };

  // Paginación
  const indexOfLast = currentPage * plansPerPage;
  const indexOfFirst = indexOfLast - plansPerPage;
  const currentPlans = plans.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(plans.length / plansPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Gestión de Planes</h3>

      {msg && <p className="mb-4 text-green-600">{msg}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded mb-6 grid gap-4 sm:grid-cols-2"
      >
        <div>
          <input
            type="number"
            name="nivel"
            placeholder="Nivel"
            value={form.nivel}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          {error.nivel && (
            <p className="text-red-500 text-sm mt-1">{error.nivel}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            name="inversion"
            placeholder="Inversión"
            value={form.inversion}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          {error.inversion && (
            <p className="text-red-500 text-sm mt-1">{error.inversion}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {editingId ? "Actualizar Plan" : "Crear Plan"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nivel</th>
              <th className="p-2">Inversión</th>
              <th className="p-2">Ganancia mensual</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((p) => (
              <tr key={p.id} className="text-center border-t">
                <td className="p-2">{p.nivel}</td>
                <td className="p-2">${p.inversion}</td>
                <td className="p-2">${(p.inversion * 0.4).toFixed(2)}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4 gap-2">
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
