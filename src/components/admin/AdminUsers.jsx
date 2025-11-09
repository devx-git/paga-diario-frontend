import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ correo: "", password: "", rol: "user" });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const headers = { Authorization: `Bearer ${token}` };

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get("/api/users", { headers });
      setUsers(res.data);
    } catch {
      setMsg("❌ Error al cargar usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!form.correo.includes("@")) errors.correo = "Correo inválido";
    if (!editingId && form.password.length < 6)
      errors.password = "Mínimo 6 caracteres";
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
        await axiosClient.put(`/api/users/${editingId}`, form, { headers });
        setMsg("✅ Usuario actualizado");
      } else {
        await axiosClient.post("/api/users", form, { headers });
        setMsg("✅ Usuario creado");
      }
      setForm({ correo: "", password: "", rol: "user" });
      setEditingId(null);
      fetchUsers();
    } catch {
      setMsg("❌ Error al guardar usuario");
    }
  };

  const handleEdit = (user) => {
    setForm({ correo: user.correo, password: "", rol: user.rol });
    setEditingId(user.id);
    setError({});
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    try {
      await axiosClient.delete(`/api/users/${id}`, { headers });
      setMsg("✅ Usuario eliminado");
      fetchUsers();
    } catch {
      setMsg("❌ Error al eliminar usuario");
    }
  };

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Gestión de Usuarios</h3>

      {msg && <p className="mb-4 text-green-600">{msg}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded mb-6 grid gap-4 sm:grid-cols-2"
      >
        <div>
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          {error.correo && (
            <p className="text-red-500 text-sm mt-1">{error.correo}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="border p-2 w-full"
            required={!editingId}
          />
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>
        <div>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {editingId ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">#</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u, index) => (
              <tr key={u.id} className="text-center border-t">
                <td className="p-2">{indexOfFirstUser + index + 1}</td>
                <td className="p-2">{u.correo}</td>
                <td className="p-2">{u.rol}</td>
                <td className="p-2 flex flex-wrap justify-center gap-2">
                   <button
                        onClick={() => handleEdit(u)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm"
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
      <div className="flex justify-center mt-4 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded text-xs sm:text-sm ${
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
