import { useState } from "react";
import useHistorialGoteo from "../../hooks/useHistorialGoteo";
import ModalRetiro from "./ModalRetiro"; 

const Historial = () => {
  const { historial, cargando } = useHistorialGoteo();
  const [modalPago, setModalPago] = useState(null);
  const [pagosRetirados, setPagosRetirados] = useState([]);

  
     // ✅ Define aquí las funciones antes del return
  const handleRetiroExitoso = (pagoId) => {
    setPagosRetirados((prev) => [...prev, pagoId]);
    setModalPago(null);
    alert("✅ Retiro realizado correctamente");
  };

  const handleCancelar = () => {
    setModalPago(null);
  };
  
  if (cargando) return <p className="text-center">Cargando historial...</p>;
  return (
      <>
      {/* ✅ Modal dentro del JSX */}
        {modalPago && (
        <ModalRetiro
          pago={modalPago}
          onSuccess={handleRetiroExitoso}
          onCancel={handleCancelar}
        />
      )}

     <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow text-sm md:text-base">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Plan</th>
            <th className="px-4 py-2">Inversión</th>
            <th className="px-4 py-2">Ganancia</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((pago, index) => (
            <tr key={pago.pago_id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{pago.fecha_inicio?.slice(0, 10) || "Fecha no disponible"}</td>
              <td className="px-4 py-2">{pago.plan_nombre}</td>
              <td className="px-4 py-2">
                {typeof pago.monto === "number" ? `$${pago.monto.toLocaleString()}` : pago.monto}
              </td>
              <td className="px-4 py-2">
                {pago.estado === "activo" ? (
                  <>
                    <div className="font-medium text-gray-700">
                      Goteando (${pago.ganancia_acumulada})  
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded transition-all duration-500"
                        style={{ width: `${(pago.dias_transcurridos / 30) * 100}%` }}
                      ></div>
                    </div>
                    <small className="text-xs text-gray-600 block mt-1">
                      {pago.dias_transcurridos}/30 días
                    </small>
                  </>
                ) : (
                  <span className="text-gray-800 font-medium">
                    ${pago.ganancia_acumulada}
                  </span>
                )}
              </td>

              <td className="px-4 py-2">
                {pago.estado === "completado" ? (
                  <div className="flex gap-1 flex-wrap">
                    <button
                      className={`px-2 py-1 rounded ${
                        pagosRetirados.includes(pago.pago_id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 text-white"
                      }`}
                      onClick={() => setModalPago(pago)}
                      disabled={pagosRetirados.includes(pago.pago_id)}
                    >
                      Retirar
                    </button>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded">Invertir</button>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">Reinvertir</button>
                  </div>
                ) : pago.estado === "incompleto" ? (
                  <span className="text-red-500">Incompleto</span>
                ) : (
                  <span className="text-gray-500">En progreso</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Historial;
