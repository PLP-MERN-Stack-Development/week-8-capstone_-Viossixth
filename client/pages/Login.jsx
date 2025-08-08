import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { post } from "../api/api";

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

 const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await post("auth/login", { email, password });
  if (res.token) {
    setToken(res.token);
    setUser(res.user);
    navigate("/dashboard");
  } else {
    setError(res.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
