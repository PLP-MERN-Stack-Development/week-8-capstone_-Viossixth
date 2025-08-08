import { useEffect, useState } from "react";
import { get } from "../api/api";
import { Link } from "react-router-dom";

export default function TutorsList() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTutors() {
      try {
        const data = await get("tutors");
        setTutors(data);
      } catch {
        setError("Failed to load tutors");
      } finally {
        setLoading(false);
      }
    }
    fetchTutors();
  }, []);

  if (loading) return <p>Loading tutors...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (tutors.length === 0) return <p>No tutors found.</p>;

  return (
    <div>
      <h2>Available Tutors</h2>
      <ul>
        {tutors.map((tutor) => (
          <li key={tutor._id}>
            <Link to={`/tutors/${tutor.userId._id}`}>
              {tutor.userId.name} — Subjects: {tutor.subjects.join(", ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
