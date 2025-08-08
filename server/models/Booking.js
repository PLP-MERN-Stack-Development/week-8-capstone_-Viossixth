import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "canceled"], default: "pending" }
}, { timestamps: true });

const booking = mongoose.model("booking",bookingSchema)

export default booking;
