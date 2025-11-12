import useHistorialGoteo from "../../hooks/useHistorialGoteo";

const Historial = () => {
  const { historial, cargando } = useHistorialGoteo();

  if (cargando) return <p className="text-center">Cargando historial...</p>;

  return (
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
                {pago.estado === "activo"
                  ? `Goteando (${pago.dias_transcurridos}/30) - $${pago.ganancia_acumulada}`
                  : `$${pago.ganancia_acumulada}`}
              </td>
              <td className="px-4 py-2">
                {pago.estado === "completado" ? (
                  <div className="flex gap-1 flex-wrap">
                    <button className="bg-green-600 text-white px-2 py-1 rounded">Retirar</button>
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
  );
};

export default Historial;
