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

export async function del(url) {
  try {
    const response = await axios.delete(url);
    return response.data;  // return server response
  } catch (error) {
    console.error("Delete request failed:", error);
    throw error;           // let the caller handle the error
  }
}

export async function patch(url, data) {
  try {
    const response = await axios.patch(url, data);
    return response.data; // return server response
  } catch (error) {
    console.error("Patch request failed:", error);
    throw error;          // let the caller handle the error
  }
}