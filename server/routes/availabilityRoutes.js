import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import Availability from "../models/Availability.js";

const router = express.Router();

// Get availability for a tutor (public)
router.get("/:tutorId", async (req, res) => {
  try {
    const availability = await Availability.find({ tutor: req.params.tutorId });
    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update availability (tutor only)
router.post("/availability", authMiddleware, async (req, res) => {
  if (req.user.role !== "tutor") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { date, slots } = req.body;
  try {
    let availability = await Availability.findOne({ tutor: req.user.id, date });

    if (availability) {
      availability.slots = slots;
    } else {
      availability = new Availability({ tutor: req.user.id, date, slots });
    }

    await availability.save();
    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete availability slot (tutor only)
router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "tutor") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const availability = await Availability.findById(req.params.id);
    if (!availability) return res.status(404).json({ message: "Not found" });
    if (availability.tutor.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    await availability.remove();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Availability for logged in tutor
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const availability = await Availability.find({ tutor: req.user.id });
    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
