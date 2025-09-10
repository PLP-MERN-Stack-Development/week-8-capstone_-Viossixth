import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected to:", conn.connection.name);
    console.log("Full URI used:", process.env.MONGO_URI);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
