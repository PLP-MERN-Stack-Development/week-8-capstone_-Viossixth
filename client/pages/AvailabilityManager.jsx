import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { get, post, del } from "../api/api";

export default function AvailabilityManager() {
  const { token } = useContext(AuthContext);
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([{ start: "", end: "" }]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const data = await get(`availability/me`, token);
        if (data.message) setError(data.message);
        else setAvailability(data);
      } catch {
        setError("Failed to load availability");
      }
    }
    fetchAvailability();
  }, [token]);

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
  };

  const addSlot = () => setSlots([...slots, { start: "", end: "" }]);

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return setError("Date is required");

    try {
      const res = await post("availability", { date, slots }, token);
      if (res._id) {
        setAvailability([...availability, res]);
        setDate("");
        setSlots([{ start: "", end: "" }]);
        setError(null);
      } else {
        setError(res.message || "Failed to save availability");
      }
    } catch {
      setError("Failed to save availability");
    }
  };

  const handleDelete = async (id) => {
    try {
      await del(`availability/${id}`, token);
      setAvailability(availability.filter((a) => a._id !== id));
    } catch {
      setError("Failed to delete availability");
    }
  };

  return (
    <div>
      <h2>Your Availability</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {availability.map((a) => (
          <li key={a._id}>
            {new Date(a.date).toLocaleDateString()}
            <ul>
              {a.slots.map(({ start, end }, i) => (
                <li key={i}>
                  {start} - {end}
                </li>
              ))}
            </ul>
            <button onClick={() => handleDelete(a._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {slots.map((slot, idx) => (
          <div key={idx}>
            <input
              type="time"
              value={slot.start}
              onChange={(e) => handleSlotChange(idx, "start", e.target.value)}
              required
            />
            <input
              type="time"
              value={slot.end}
              onChange={(e) => handleSlotChange(idx, "end", e.target.value)}
              required
            />
            {slots.length > 1 && (
              <button type="button" onClick={() => removeSlot(idx)}>
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addSlot}>
          Add Slot
        </button>

        <button type="submit">Save Availability</button>
      </form>
    </div>
  );
}
