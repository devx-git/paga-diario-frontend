import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import QrSelector from "./QrSelector";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PaymentForm() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState("nequi");
  const [form, setForm] = useState({ nombre: "", celular: "", referencia: "" });
  const [msg, setMsg] = useState("");
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  // ✅ Recuperar el plan desde localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("planSeleccionado");
    if (storedPlan) {
      setPlanSeleccionado(JSON.parse(storedPlan));
    } else {
    setMsg("❌ No se ha seleccionado ningún plan");
    }
    }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plan_id = planSeleccionado?.id || 0;

    // ✅ Validación completa
    if (!form.nombre || !form.celular || !form.referencia || plan_id === 0) {
      setMsg("❌ Todos los campos son obligatorios y debes seleccionar un plan válido");
      return;
    }

    const datos = {
      metodo,
      referencia: form.referencia,
      nombre: form.nombre,
      celular: form.celular,
      plan_id: Number(plan_id)
    };

    console.log("📤 Enviando datos:", datos);

    try {
      await axiosClient.post("/api/pagos", datos, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg("✅ Pago registrado. Tu plan se activará en breve.");
      setTimeout(() => {
        navigate("/perfil");
      }, 1500);
    } catch (error) {
      console.error("❌ Error al registrar el pago:", error);
      setMsg("❌ Error al registrar el pago");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Realizar pago</h2>

      {/* ✅ Mostrar resumen del plan si está disponible */}
      {planSeleccionado && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-gray-800">
          <p><strong>Plan:</strong> Llave {planSeleccionado.numero}</p>
          <p><strong>Inversión:</strong> ${planSeleccionado.inversion}</p>
          <p><strong>Ganancia mensual:</strong> ${planSeleccionado.ganancia}</p>
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Método de pago</label>
        <select
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="nequi">Nequi</option>
          <option value="daviplata">Daviplata</option>
        </select>
      </div>

      <QrSelector metodo={metodo} />

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del titular"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="celular"
          placeholder="Celular"
          value={form.celular}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="referencia"
          placeholder="Referencia del pago"
          value={form.referencia}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Enviar comprobante
        </button>
      </form>

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
