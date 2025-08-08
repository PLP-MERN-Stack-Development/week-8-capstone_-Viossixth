import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { get } from "../api/api";

export default function TutorDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const profileData = await get(`tutors/${id}`);
        setProfile(profileData);
        const availabilityData = await get(`availability/${id}`);
        setAvailability(availabilityData);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p>Loading tutor details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div>
      <h2>{profile.userId.name}</h2>
      <p>{profile.bio}</p>
      <p>Subjects: {profile.subjects.join(", ")}</p>
      <p>Hourly Rate: ${profile.hourlyRate}</p>

      <h3>Availability</h3>
      <ul>
        {availability.map((a) => (
          <li key={a._id}>
            {new Date(a.date).toLocaleDateString()} - Slots:{" "}
            {a.slots.map(({ start, end }, i) => (
              <span key={i}>
                {start}–{end}{" "}
              </span>
            ))}
          </li>
        ))}
      </ul>

      {/* Link to booking page for this tutor */}
      <a href={`/book/${id}`}>Book a Session</a>
    </div>
  );
}
