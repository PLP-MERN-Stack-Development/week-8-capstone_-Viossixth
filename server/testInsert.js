import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://chrismaluleke6:nFW9UAj8XNX4N65p@willow.khelnpo.mongodb.net/willow";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

async function test() {
  const newUser = new User({ name: "Test", email: "test@test.com", password: "123", role: "student" });
  await newUser.save();
  const users = await User.find();
  console.log(users);
  mongoose.connection.close();
}

test();
