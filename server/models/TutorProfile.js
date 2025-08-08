import mongoose from "mongoose";

const TutorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  bio: { type: String, required: true },
  subjects: [{ type: String, required: true }],
  hourlyRate: { type: Number, required: true },
  availability: [
    {
      day: String, // e.g. "Monday"
      slots: [String] // e.g. ["09:00-10:00", "14:00-15:00"]
    }
  ]
}, { timestamps: true });

export default "TutorProfile";
