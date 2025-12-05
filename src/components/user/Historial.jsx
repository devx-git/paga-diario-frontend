import { useState } from "react";
import useHistorialGoteo from "../../hooks/useHistorialGoteo";
import ModalRetiro from "./ModalRetiro"; 
import ModalInvertir from "./ModalInvertir";
import ModalReinvertir from "./ModalReinvertir";


const Historial = () => {
  const { historial, cargando } = useHistorialGoteo();
  const [modalPago, setModalPago] = useState(null);
  const [pagosRetirados, setPagosRetirados] = useState([]);
  const [modalInvertir, setModalInvertir] = useState(null);
  const [modalReinvertir, setModalReinvertir] = useState(null);
  const [accionesDesactivadas, setAccionesDesactivadas] = useState({});




  
     // ✅ Define aquí las funciones antes del return
  const handleRetiroExitoso = (pagoId) => {
    setPagosRetirados((prev) => [...prev, pagoId]);
    setModalPago(null);
    alert("✅ Retiro realizado correctamente");
  };

  const handleCancelar = () => {
    setModalPago(null);
  };

  const handleAccion = (pagoId, tipoAccion) => {
  // Aquí puedes abrir el modal según la acción
  if (tipoAccion === "retirar") {
    setModalPago(historial.find(p => p.pago_id === pagoId));
  } else if (tipoAccion === "invertir") {
    setModalInvertir(historial.find(p => p.pago_id === pagoId));
  } else if (tipoAccion === "reinvertir") {
    setModalReinvertir(historial.find(p => p.pago_id === pagoId));
  }

  // ✅ Desactivar botones para ese pago
  setAccionesDesactivadas(prev => ({ ...prev, [pagoId]: true }));
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

      {modalInvertir && (
        <ModalInvertir pago={modalInvertir} onClose={() => setModalInvertir(null)} />
      )}

      {modalReinvertir && (
        <ModalReinvertir pago={modalReinvertir} onClose={() => setModalReinvertir(null)} />
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
      {!accionesDesactivadas[pago.pago_id] && (
        <>
          <button
            className="bg-green-600 text-white px-2 py-1 rounded"
            onClick={() => handleAccion(pago.pago_id, "retirar")}
          >
            Retirar
          </button>
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded"
            onClick={() => handleAccion(pago.pago_id, "invertir")}
          >
            Invertir
          </button>
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded"
            onClick={() => handleAccion(pago.pago_id, "reinvertir")}
          >
            Reinvertir
          </button>
        </>
      )}
      {accionesDesactivadas[pago.pago_id] && (
        <span className="text-gray-400">Acción realizada</span>
      )}
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
