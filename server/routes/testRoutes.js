import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/private", authMiddleware, (req,res) => {
    res.json({ message: `Hello user ${req.user.id}, you are authorized!`})
});

export default router;