import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const { token,user,setToken,setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };


 return (
    <nav>
      {token ? (
        <>
          <span>
            Welcome, {user.name} ({user.role})
          </span>
          <Link to="/dashboard">Dashboard</Link>
          {user.role === "tutor" && <Link to="/availability">Manage Availability</Link>}
          <Link to="/bookings">My Bookings</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}