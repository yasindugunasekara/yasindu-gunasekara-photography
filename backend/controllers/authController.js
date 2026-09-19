const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { username: admin.username, id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { username: admin.username, id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Long-lived refresh token
    );

    // Save refresh token in DB
    admin.refreshToken = refreshToken;
    await admin.save();

    // Set HttpOnly Cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current and new passwords are required" });
    }

    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ error: "Server error updating password" });
  }
};

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    // Verify token
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid refresh token" });

      // Verify token exists in DB
      const admin = await Admin.findById(decoded.id);
      if (!admin || admin.refreshToken !== refreshToken) {
        return res.status(403).json({ error: "Refresh token revoked or invalid" });
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { username: admin.username, id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
      });

      res.json({ success: true, message: "Token refreshed" });
    });
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ error: "Server error during refresh" });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      // Remove token from DB
      await Admin.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server error during logout" });
  }
};

module.exports = {
  login,
  changePassword,
  refresh,
  logout
};
