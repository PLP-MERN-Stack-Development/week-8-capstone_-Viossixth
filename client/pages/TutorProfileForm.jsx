import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { post } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function TutorProfileForm() {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: "",
    subjects: [],
    hourlyRate: "",
    availability: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await post("tutors", formData, token);
    if (res._id) navigate(`/tutors/${user.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Your bio"
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        required
      />
      <input
        placeholder="Subjects (comma separated)"
        value={formData.subjects}
        onChange={(e) =>
          setFormData({ ...formData, subjects: e.target.value.split(",") })
        }
        required
      />
      <input
        type="number"
        placeholder="Hourly Rate"
        value={formData.hourlyRate}
        onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
        required
      />
      {/* Availability builder can be a separate UI — for now a placeholder */}
      <button type="submit">Save Profile</button>
    </form>
  );
}
