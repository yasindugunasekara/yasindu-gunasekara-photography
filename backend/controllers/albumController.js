const Album = require("../models/Album");

const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({ error: "Failed to fetch albums" });
  }
};

const createAlbum = async (req, res) => {
  try {
    const { alt, category, images } = req.body;
    
    if (!alt || typeof alt !== 'string') return res.status(400).json({ error: "Invalid title" });
    if (!category || typeof category !== 'string') return res.status(400).json({ error: "Invalid category" });
    if (!Array.isArray(images) || images.length === 0) return res.status(400).json({ error: "Images must be a non-empty array" });

    const formattedImages = images.map((src, index) => ({ id: index + 1, src }));
    
    const newAlbum = await Album.create({
      alt,
      category,
      images: formattedImages
    });

    res.status(201).json(newAlbum);
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({ error: "Failed to create album" });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { alt, category, images } = req.body;
    
    if (!alt || typeof alt !== 'string') return res.status(400).json({ error: "Invalid title" });
    if (!category || typeof category !== 'string') return res.status(400).json({ error: "Invalid category" });
    if (!Array.isArray(images) || images.length === 0) return res.status(400).json({ error: "Images must be a non-empty array" });

    const formattedImages = images.map((src, index) => ({ id: index + 1, src }));

    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      { alt, category, images: formattedImages },
      { new: true }
    );
    
    if (!updatedAlbum) {
      return res.status(404).json({ error: "Album not found" });
    }

    res.json(updatedAlbum);
  } catch (error) {
    console.error("Error updating album:", error);
    res.status(500).json({ error: "Failed to update album" });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAlbum = await Album.findByIdAndDelete(id);
    
    if (!deletedAlbum) {
      return res.status(404).json({ error: "Album not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).json({ error: "Failed to delete album" });
  }
};

const uploadImages = (req, res) => {
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
};

module.exports = {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  uploadImages,
};
