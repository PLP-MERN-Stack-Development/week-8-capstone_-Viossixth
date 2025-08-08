import express from "express";
import { createProfile, getProfile, updateProfile } from "../controllers/tutorControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProfile);      // Create profile
router.get("/:userId", getProfile);                   // View a tutor's profile
router.put("/:userId", authMiddleware, updateProfile);// Edit profile
router.get("/", async (req, res) => {                 // To see all tutor profiles
  try {
    const tutors = await TutorProfile.find().populate("userId", "name");
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
