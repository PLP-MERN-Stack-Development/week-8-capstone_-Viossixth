import { useEffect, useState, useContext } from "react";
import { get } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function TutorDashboard() {
  const { token, user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await get("bookings/me", token);
        // Only bookings where the tutor is the logged-in user
        const tutorBookings = data.filter(b => b.tutor._id === user.id);
        setBookings(tutorBookings);
      } catch {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [token, user.id]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const upcoming = bookings.filter(b => b.status === "confirmed");
  const pending = bookings.filter(b => b.status === "pending");

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>

      <section>
        <h2>Upcoming Sessions</h2>
        {upcoming.length === 0 ? (
          <p>No upcoming sessions.</p>
        ) : (
          <ul>
            {upcoming.map(b => (
              <li key={b._id}>
                {b.subject} with {b.student.name} on{" "}
                {new Date(b.date).toLocaleDateString()} {b.start}-{b.end}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Pending Booking Requests</h2>
        {pending.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <ul>
            {pending.map(b => (
              <li key={b._id}>
                {b.subject} with {b.student.name} on{" "}
                {new Date(b.date).toLocaleDateString()} {b.start}-{b.end}{" "}
                <Link to="/bookings">Manage</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Quick Links</h2>
        <ul>
          <li>
            <Link to="/availability">Manage Availability</Link>
          </li>
          <li>
            <Link to="/bookings">View All Bookings</Link>
          </li>
          <li>
            <Link to="/profile">Edit Profile</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
