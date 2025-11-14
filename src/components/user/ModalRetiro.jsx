import { useState } from "react";
import axiosClient from "../../api/axiosClient";

const ModalRetiro = ({ pago, onSuccess, onCancel }) => {
  const [titular, setTitular] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [banco, setBanco] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosClient.post("/api/retiros", {
        pago_id: pago.pago_id,
        titular,
        tipo_cuenta: tipoCuenta,
        numero_cuenta: numeroCuenta,
        monto: pago.ganancia_acumulada,
         ...(banco && { banco }) // solo se envía si existe
        }, {
        headers: { Authorization: `Bearer ${token}` }
        });

        onSuccess(pago.pago_id); // ✅ solo si fue exitoso

           
    } catch (error) {
      console.error("❌ Error al registrar retiro:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Retirar ganancias</h2>
        <label className="block mb-2">
          Titular de la cuenta:
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={titular}
            onChange={(e) => setTitular(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          Tipo de cuenta:
          <select
            className="w-full border p-2 rounded"
            value={tipoCuenta}
            onChange={(e) => setTipoCuenta(e.target.value)}
            required
          >
            <option value="">Selecciona</option>
            <option value="ahorros">Ahorros</option>
            <option value="corriente">Corriente</option>
            <option value="nequi">Nequi</option>
            <option value="daviplata">Daviplata</option>
          </select>
        </label>

        {["ahorros", "corriente"].includes(tipoCuenta) && (
          <label className="block mb-2">
            Banco:
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={banco}
              onChange={(e) => setBanco(e.target.value)}
              placeholder="Ej: Bancolombia, Davivienda"
              required
            />
          </label>
        )}


        <label className="block mb-2">
          Número de cuenta o celular:
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={numeroCuenta}
            onChange={(e) => setNumeroCuenta(e.target.value)}
            required
          />
        </label>

        <div className="mb-4">
          <strong>Monto a retirar:</strong> ${pago.ganancia_acumulada}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Confirmar retiro
          </button>
          <button type="button" className="text-gray-600" onClick={onCancel}>
            Cancelar
          </button>

        </div>
      </form>
    </div>
  );
};

export default ModalRetiro;
