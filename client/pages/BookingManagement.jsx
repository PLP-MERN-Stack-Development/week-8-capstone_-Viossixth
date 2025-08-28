import { useEffect, useState, useContext } from "react";
import { get, patch, del } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function BookingManagement() {
  const { token, user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await get("bookings/me", token);
        setBookings(data);
      } catch {
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [token]);

  const handleConfirm = async (id) => {
    try {
      const updated = await patch(`bookings/${id}/status`, { status: "confirmed" }, token);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
    } catch {
      setError("Failed to confirm booking");
    }
  };

  const handleCancelByTutor = async (id) => {
    try {
      const updated = await patch(`bookings/${id}/status`, { status: "cancelled" }, token);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
    } catch {
      setError("Failed to cancel booking");
    }
  };

  const handleCancelByStudent = async (id) => {
    try {
      await del(`bookings/${id}`, token);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      setError("Failed to cancel booking");
    }
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b._id} style={{ marginBottom: "1rem" }}>
            <strong>{b.subject}</strong> with{" "}
            {user.role === "student" ? b.tutor.name : b.student.name} on{" "}
            {new Date(b.date).toLocaleDateString()} from {b.start} to {b.end} —{" "}
            <em>{b.status}</em>

            {/* Actions based on role & booking status */}
            {user.role === "tutor" && b.status === "pending" && (
              <>
                <button onClick={() => handleConfirm(b._id)}>Confirm</button>
                <button onClick={() => handleCancelByTutor(b._id)}>Cancel</button>
              </>
            )}

            {user.role === "student" && b.status === "pending" && (
              <button onClick={() => handleCancelByStudent(b._id)}>Cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

