require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yasindu_photography';

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const username = process.env.ADMIN_USER;
    const password = process.env.ADMIN_PASS;

    if (!username || !password) {
      console.error('Error: ADMIN_USER and ADMIN_PASS must be set in .env');
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin user already exists in the database.');
      process.exit(0);
    }

    const admin = new Admin({ username, password });
    await admin.save();

    console.log(`Successfully created admin user: ${username}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
