require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Find admin by old username field
    const admin = await mongoose.connection.collection('admins').findOne({ username: { $exists: true } });
    if (admin) {
      // Create a new admin object with the email
      const newAdmin = {
        email: 'admin@yasindu.com',
        password: admin.password,
        refreshToken: admin.refreshToken
      };

      // Save new admin
      await mongoose.connection.collection('admins').insertOne(newAdmin);
      
      // Delete old admin
      await mongoose.connection.collection('admins').deleteOne({ _id: admin._id });
      
      console.log('Successfully migrated admin to use email: admin@yasindu.com');
    } else {
      console.log('No admin found with a username, or already migrated.');
      
      // Just check if email admin exists
      const emailAdmin = await mongoose.connection.collection('admins').findOne({ email: 'admin@yasindu.com' });
      if (emailAdmin) {
         console.log('Admin with email already exists.');
      } else {
         console.log('No admin found at all. You may need to seed the database.');
      }
    }
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.disconnect();
  }
};

runMigration();
