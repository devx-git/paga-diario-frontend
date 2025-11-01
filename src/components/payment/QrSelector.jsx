export default function QrSelector({ metodo }) {
  const qrNequi = "/qr/nequi.png";      // Ruta local o CDN
  const qrDaviplata = "/qr/daviplata.png";

  return (
    <div className="mb-4 text-center">
      <h3 className="text-lg font-semibold mb-2">Escanea el QR de {metodo}</h3>
      <img
        src={metodo === "nequi" ? qrNequi : qrDaviplata}
        alt={`QR ${metodo}`}
        className="mx-auto w-48 h-48 object-contain"
      />
    </div>
  );
}
