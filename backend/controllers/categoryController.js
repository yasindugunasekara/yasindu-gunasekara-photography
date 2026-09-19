const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { id, label } = req.body;
    
    if (!id || !label) {
      return res.status(400).json({ error: "ID and label required" });
    }

    const newCategory = await Category.create({ id, label });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category (may already exist)" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // this is the string ID like 'portrait', not the ObjectId
    const deletedCategory = await Category.findOneAndDelete({ id });
    
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
