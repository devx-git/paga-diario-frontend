import { useAuth } from "../../context/AuthContext";

export default function UserInfo() {
  const { user } = useAuth();

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Información personal</h3>
      <p><strong>Correo:</strong> {user?.correo}</p>
      <p><strong>Rol:</strong> {user?.rol}</p>
    </div>
  );
}
