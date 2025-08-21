const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

// ✅ use default port if PORT is not in env (important for Render)
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// ✅ connect to MongoDB
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local frontend
      "https://your-frontend.onrender.com", // replace with deployed frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use("/", authRoute);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
