const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./Routes/AuthRoute");

const app = express();

// ✅ use default port if PORT is not in env (important for Render)
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// ✅ connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Routes
app.use("/auth", authRoute);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
