// src/components/user/ModalReinvertir.jsx
import axiosClient from "../../api/axiosClient";

const ModalReinvertir = ({ pago, onClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axiosClient.post(`/api/historial/reinvertir/${pago.pago_id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Reinversión realizada correctamente");
      onClose();
    } catch (error) {
      console.error("❌ Error al reinvertir:", error);
      alert("❌ Error al reinvertir");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reinvertir</h2>

        <p className="mb-4">
          ¿Deseas reinvertir la ganancia de <strong>${pago.ganancia_acumulada}</strong> en el mismo plan <strong>{pago.plan_nombre}</strong>?
        </p>

        <div className="flex justify-between">
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
            Confirmar reinversión
          </button>
          <button type="button" className="text-gray-600" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalReinvertir;
