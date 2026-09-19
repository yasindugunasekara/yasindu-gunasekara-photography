const express = require("express");
const router = express.Router();
const { login, changePassword, refresh, logout } = require("../controllers/authController");
const authenticateToken = require("../middleware/auth");

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.put("/admin/password", authenticateToken, changePassword);

module.exports = router;
