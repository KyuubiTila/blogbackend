const mongoose = require('mongoose');

// create schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: [true, 'Post Title is required'],
      trim: true,
    },

    description: {
      type: string,
      required: [true, 'Post description is required'],
    },

    category: {
      type: mongoose.Schema.Types.objectId,
      ref: 'Category',
      required: [true, 'Post category is required'],
    },

    numViews: [
      {
        type: mongoose.Schema.Types.objectId,
        ref: 'User',
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.objectId,
        ref: 'User',
      },
    ],

    disLikes: [
      {
        type: mongoose.Schema.Types.objectId,
        ref: 'User',
      },
    ],

    user: [
      {
        type: mongoose.Schema.Types.objectId,
        ref: 'User',
        required: [true, 'Please Author is required'],
      },
    ],

    photo: {
      type: String,
      required: [true, 'Post image is required'],
    },
  },

  {
    timestamps: true,
  }
);

//Compile the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
