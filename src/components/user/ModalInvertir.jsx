import axiosClient from "../../api/axiosClient";

const ModalInvertir = ({ pago, onClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axiosClient.post(`/api/historial/invertir/${pago.pago_id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Inversión realizada correctamente");
      onClose();
    } catch (error) {
      console.error("❌ Error al invertir:", error);
      alert("❌ Error al invertir");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Invertir</h2>

        <p className="mb-4">
          ¿Deseas invertir la ganancia de <strong>${pago.ganancia_acumulada}</strong>?
        </p>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Confirmar inversión
          </button>
          <button type="button" className="text-gray-600" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalInvertir;
