import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <nav>
      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
