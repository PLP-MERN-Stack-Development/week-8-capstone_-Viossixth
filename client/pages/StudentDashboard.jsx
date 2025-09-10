import { useEffect, useState } from "react";
import { get } from "../api/api";
import TutorCard from "./TutorCard";

export default function StudentDashboard() {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTutors, setFilteredTutors] = useState([]);

  useEffect(() => {
    async function fetchTutors() {
      const data = await get("tutors");
      setTutors(data);
      setFilteredTutors(data);
    }
    fetchTutors();
  }, []);

  useEffect(() => {
    const filtered = tutors.filter((t) =>
      t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredTutors(filtered);
  }, [search, tutors]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        {filteredTutors.map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}
