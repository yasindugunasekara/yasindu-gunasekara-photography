const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary");
const authenticateToken = require("../middleware/auth");
const {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  uploadImages,
} = require("../controllers/albumController");

router.get("/albums", getAlbums);
router.post("/albums", authenticateToken, createAlbum);
router.put("/albums/:id", authenticateToken, updateAlbum);
router.delete("/albums/:id", authenticateToken, deleteAlbum);

router.post("/upload", authenticateToken, upload.array("images", 50), uploadImages);

module.exports = router;
