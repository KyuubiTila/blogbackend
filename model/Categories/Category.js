const mongoose = require('mongoose');

// create schema
const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.objectId,
      ref: 'User',
      required: true,
    },

    ttle: {
      type: string,
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
