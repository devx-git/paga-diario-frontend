import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const useHistorialGoteo = () => {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const { data } = await axiosClient.get("/api/historial/goteo", {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
         console.log("📦 Historial con goteo:", data); // ← verifica esto
        setHistorial(data);
      } catch (error) {
        console.error("❌ Error al obtener historial con goteo:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerHistorial();
  }, []);

  return { historial, cargando };
};

export default useHistorialGoteo;
