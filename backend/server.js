require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "yasindu_photography",
    allowedFormats: ["jpg", "png", "jpeg", "webp"],
  },
});
const upload = multer({ storage: storage });

// Admin Credentials & JWT Secret
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const JWT_SECRET = process.env.JWT_SECRET;

// Database File Path
const DB_PATH = path.join(__dirname, "data.json");

// Helper to read DB
const readDB = () => {
  if (!fs.existsSync(DB_PATH)) return { albums: [], categories: [] };
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
};

// Helper to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access Denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });
    req.user = user;
    next();
  });
};

// --- ROUTES ---

// 1. Admin Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// 2. Upload Image to Cloudinary (Protected)
app.post("/api/upload", authenticateToken, upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const urls = req.files.map((file) => file.path);
    res.json({ urls });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// 3. Get Albums
app.get("/api/albums", (req, res) => {
  res.json(readDB().albums || []);
});

// 4. Create Album (Protected with Validation)
app.post("/api/albums", authenticateToken, (req, res) => {
  const { alt, category, images } = req.body;
  
  // Validation
  if (!alt || typeof alt !== 'string') return res.status(400).json({ error: "Invalid title" });
  if (!category || typeof category !== 'string') return res.status(400).json({ error: "Invalid category" });
  if (!Array.isArray(images) || images.length === 0) return res.status(400).json({ error: "Images must be a non-empty array" });

  const db = readDB();
  const newAlbum = {
    id: Date.now().toString(),
    alt,
    category,
    images: images.map((src, index) => ({ id: index + 1, src }))
  };
  
  db.albums.unshift(newAlbum);
  writeDB(db);
  res.json(newAlbum);
});

// 5. Edit Album (Protected with Validation)
app.put("/api/albums/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { alt, category, images } = req.body;
  
  // Validation
  if (!alt || typeof alt !== 'string') return res.status(400).json({ error: "Invalid title" });
  if (!category || typeof category !== 'string') return res.status(400).json({ error: "Invalid category" });
  if (!Array.isArray(images) || images.length === 0) return res.status(400).json({ error: "Images must be a non-empty array" });

  const db = readDB();
  const albumIndex = db.albums.findIndex((album) => album.id === id);
  
  if (albumIndex === -1) {
    return res.status(404).json({ error: "Album not found" });
  }

  db.albums[albumIndex] = {
    ...db.albums[albumIndex],
    alt,
    category,
    images: images.map((src, index) => ({ id: index + 1, src }))
  };
  
  writeDB(db);
  res.json(db.albums[albumIndex]);
});

// 6. Delete Album (Protected)
app.delete("/api/albums/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.albums = db.albums.filter((album) => album.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

   const prompt = `
You are Yasindu Gunasekara Photography's professional assistant.  
Only answer about photography services, packages, prices, and booking.  
Keep answers very short, simple, and friendly.  

Rules:
- If user says "I want shoot", ask what type (event, portrait, birthday, wedding, beach, campus, shows).  
- When they tell the type, reply with a short package detail: coverage time, photo count, and price.  
- If they want to book, ask for contact details and event date.  
- Never answer unrelated questions.  

Customer: ${message}
`;



    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Gemini chat error:", err.message || err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
