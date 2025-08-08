import express from "express";
import {register,login} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", (req, res) => {
  res.status(201).json({ message: "User registered" });
});

router.post("/login", (req, res) => {
  res.status(201).json({ message: "User has logged in" });
});


export default router;