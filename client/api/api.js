const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function post(endpoint, data, token) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function get(endpoint, token) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.json();
}
