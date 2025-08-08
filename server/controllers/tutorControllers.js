import TutorProfile from "../models/TutorProfile.js";

export const createProfile = async (req, res) => {
  try {
    const existing = await TutorProfile.findOne({ userId: req.user.id });
    if (existing) return res.status(400).json({ message: "Profile already exists" });

    const profile = await TutorProfile.create({
      userId: req.user.id,
      bio: req.body.bio,
      subjects: req.body.subjects,
      hourlyRate: req.body.hourlyRate,
      availability: req.body.availability
    });
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await TutorProfile.findOne({ userId: req.params.userId }).populate("userId", "name email");
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) return res.status(403).json({ message: "Unauthorized" });

    const profile = await TutorProfile.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
