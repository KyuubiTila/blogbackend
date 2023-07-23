const mongoose = require('mongoose');

// create schema
const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    ttle: {
      type: String,
      required: true,
    },
  },

  {
    timestamp: true,
  }
);

//Compile the category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
