import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB  from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tutors", tutorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));

const allowedOrigins = [
  "http://localhost:5173", // Dev frontend
  "http://willow.app",    // Prod frontend
];





