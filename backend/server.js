require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const albumRoutes = require("./routes/albumRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Prevent NoSQL injection attacks by sanitizing in-place instead of replacing req objects
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.query) mongoSanitize.sanitize(req.query);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

// Register Routes
app.use("/api", authRoutes);
app.use("/api", albumRoutes);
app.use("/api", categoryRoutes);
app.use("/", chatRoutes); // /chat is registered on root for backward compatibility with frontend

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Express Global Error:", err);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
