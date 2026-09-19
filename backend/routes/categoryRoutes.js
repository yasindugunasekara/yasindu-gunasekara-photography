const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/categories", getCategories);
router.post("/categories", authenticateToken, createCategory);
router.delete("/categories/:id", authenticateToken, deleteCategory);

module.exports = router;
