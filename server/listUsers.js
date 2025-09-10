// listUsers.js
import mongoose from "mongoose";

// Replace this with your actual connection string
const MONGO_URI = "mongodb://localhost:27017/willow"; 

// Define the User schema (should match your backend)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
}, { collection: "users" });

const User = mongoose.model("User", userSchema);

async function listUsers() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const users = await User.find();
    console.log("All users:", users);

    mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
    mongoose.connection.close();
  }
}

listUsers();
