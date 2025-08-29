import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials :true,
  headers: { "Content-Type": "application/json" },
});


// Wraps to keep consistency
export const get = (endpoint, token) =>
  api.get(endpoint, token && { headers: { Authorization: `Bearer ${token}` } });

export const post = (endpoint, data, token) =>
  api.post(endpoint, data, token && { headers: { Authorization: `Bearer ${token}` } });

export const patch = (endpoint, data, token) =>
  api.patch(endpoint, data, token && { headers: { Authorization: `Bearer ${token}` } });

export const del = (endpoint, token) =>
  api.delete(endpoint, token && { headers: { Authorization: `Bearer ${token}` } });
