import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { post } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.log("Sending formData:", formData);

    try {
      const res = await post("auth/register", formData);

      if (res && res.message === "User registered successfully") {
        // Optionally store token if returned
        if (res.token) setToken(res.token);
        navigate("/login");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="tutor">Tutor</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
