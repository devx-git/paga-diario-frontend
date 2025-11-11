import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde el token si existe (opcional: puedes hacer una petición para validar el token)
  useEffect(() => {
  if (token) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }
  setLoading(false);
}, [token]);


  const login = (token, user) => {
  setUser(user);
  setToken(token);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user)); // ← guarda también el usuario
};


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}