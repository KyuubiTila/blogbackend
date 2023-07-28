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
      required: [true, 'Post image is required'],
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

// GET NUMBER OF LIKES COUNT
postSchema.virtual('likesCount').get(function () {
  return this.likes.length;
});

// GET NUMBER OF DISLIKES COUNT
postSchema.virtual('dislikesCount').get(function () {
  return this.disLikes.length;
});

//DAYS AGO OF POST
postSchema.virtual('daysAgoOfPost').get(function () {
  const post = this;
  const date = new Date(post.createdAt);
  const daysAgo = Math.floor((Date.now() - date) / 86400000);
  return daysAgo === 0
    ? 'today'
    : daysAgo === 1
    ? 'yesterday'
    : `${daysAgo} days ago`;
});
//Compile the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
