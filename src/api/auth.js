// src/api/auth.js
import axiosClient from "./axiosClient";

export const registerUser = async (userData) => {
  const response = await axiosClient.post("/api/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosClient.post("/api/auth/login", credentials);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axiosClient.get("/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await axiosClient.get("/api/auth/verificar", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
