import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function BookingForm() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [availability, setAvailability] = useState([]);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const data = await get(`availability/${id}`);
        setAvailability(data);
      } catch {
        setError("Failed to load availability");
      }
    }
    fetchAvailability();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !slot || !subject) return setError("All fields are required");

    const [start, end] = slot.split("-");

    try {
      const res = await post(
        "bookings",
        { tutor: id, date, start, end, subject },
        token
      );
      if (res._id) {
        navigate("/dashboard");
      } else {
        setError(res.message || "Booking failed");
      }
    } catch {
      setError("Booking failed");
    }
  };

  // Extract available slots for the selected date
  const slotsForDate = availability.find(
    (a) => a.date === date
  )?.slots.map(({ start, end }) => `${start}-${end}`) || [];

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label>
        Slot:
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
          disabled={!date || slotsForDate.length === 0}
        >
          <option value="">Select a slot</option>
          {slotsForDate.map((s, idx) => (
            <option key={idx} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Book Session</button>
    </form>
  );
}
