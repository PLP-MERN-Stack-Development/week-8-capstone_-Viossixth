import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  console.log("Register route hit");
  console.log("Request body type:", typeof req.body);
  console.log("Request body content:", req.body);

  const { name, email, password, role } = req.body;
  
  try {
    if (!name || !email || !password || !role) {
      console.log("Missing fields in request body");
      return res.status(400).json({ message: "Missing required fields" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });
    const savedUser = await user.save();

    console.log("Saved user:", savedUser);
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Only send ONE response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
