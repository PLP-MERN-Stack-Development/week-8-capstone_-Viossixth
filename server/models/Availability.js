import mongoose from "mongoose";


const availabilitySchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  slots: [
    {
      start: { type: String, required: true }, // e.g., "14:00"
      end: { type: String, required: true }    // e.g., "15:00"
    }
  ]
}, { timestamps: true });

const availability = mongoose.model("availability", availabilitySchema);

export default availability;