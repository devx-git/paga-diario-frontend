import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/api/auth/register", {
        nombre,
        correo: email,
        password,
        rol: "cliente", // se asigna automáticamente
      });
      setMsg("✅ Registro exitoso. Ya puedes iniciar sesión.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMsg("❌ Error al registrar. Verifica los datos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0F172A] text-white">
      <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">Registro</h2>
      <form onSubmit={handleSubmit} className="bg-[#1E3A8A] p-6 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full border p-2 mb-3 text-black"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border p-2 mb-3 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 mb-3 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-[#D4AF37] text-[#0F172A] w-full py-2 rounded font-semibold">
          Registrarse
        </button>
        {msg && <p className="mt-3 text-center text-sm">{msg}</p>}
      </form>
    </div>
  );
}
