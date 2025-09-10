import { Link } from "react-router-dom";

export default function TutorCard({ tutor }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "1rem"
    }}>
      <h3>{tutor.userId.name}</h3>
      <p>{tutor.bio.substring(0, 60)}...</p>
      <p>Subjects: {tutor.subjects.join(", ")}</p>
      <p>Rate: ${tutor.hourlyRate}/hr</p>
      <Link to={`/tutors/${tutor.userId._id}`}>View Profile & Book</Link>
    </div>
  );
}
