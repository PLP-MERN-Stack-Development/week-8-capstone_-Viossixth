import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js"

const router = express.Router();

// Student books a session
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can book sessions" });
  }

  const { tutor, date, start, end, subject } = req.body;

  try {
    // Optional: add checks for double-booking, tutor availability

    const booking = new Booking({
      tutor,
      student: req.user.id,
      date,
      start,
      end,
      subject,
      status: "pending"
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bookings for logged-in user (both roles)
router.get("/", authMiddleware, async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "tutor") {
      bookings = await Booking.find({ tutor: req.user.id }).populate("student", "name email");
    } else {
      bookings = await Booking.find({ student: req.user.id }).populate("tutor", "name email");
    }

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
