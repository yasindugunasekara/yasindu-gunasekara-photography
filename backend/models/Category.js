const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Category', categorySchema);
