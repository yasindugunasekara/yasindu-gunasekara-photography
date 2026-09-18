const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  src: {
    type: String,
    required: true,
  }
}, { _id: false });

const albumSchema = new mongoose.Schema({
  alt: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [imageSchema],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Album', albumSchema);
