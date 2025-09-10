import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard.jsx";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {user.role === "student" ? <StudentDashboard /> : <TutorDashboard />}
    </div>
  );
}
