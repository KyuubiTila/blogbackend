const mongoose = require('mongoose');

// create schema
const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.objectId,
      ref: 'Post',
      required: [true, 'Post is required'],
    },

    user: {
      type: Object,
      required: [true, 'User is required'],
    },

    description: {
      type: String,
      required: [true, 'Comment description is required'],
    },
  },

  {
    timestamp: true,
  }
);

//Compile the comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
