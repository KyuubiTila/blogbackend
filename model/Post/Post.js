const mongoose = require('mongoose');

// create schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post Title is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Post description is required'],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Post category is required'],
    },

    numViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Author is required'],
      },
    ],

    photo: {
      type: String,
      // required: [true, 'Post image is required'],
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// GET NUMBER OF VIEWS COUNT
postSchema.virtual('numViewsCount').get(function () {
  return this.numViews.length;
});
//Compile the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
