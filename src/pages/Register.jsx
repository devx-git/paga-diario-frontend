import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/api/auth/register", { email, password });
      setMsg("✅ Registro exitoso. Ya puedes iniciar sesión.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMsg("❌ Error al registrar. Verifica los datos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <input
          type="email"
          placeholder="Correo"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white w-full py-2 rounded">
          Registrarse
        </button>
        {msg && <p className="mt-3 text-center">{msg}</p>}
      </form>
    </div>
  );
}
