// const { default: mongoose } = require('mongoose');

const mongoose = require('mongoose');

// create schema
const userSchema = new mongoose.Schema(
  {
    firstNAme: {
      type: String,
      required: [true, 'First Name is rquired'],
    },

    lastName: {
      type: String,
      required: [true, 'Last Name is rquired'],
    },

    profilePicture: {
      type: String,
    },

    email: {
      type: String,
      required: [true, 'Email Name is rquired'],
    },

    password: {
      type: String,
      required: [true, 'Password Name is rquired'],
    },

    postCount: {
      type: number,
      default: 0,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    roles: {
      type: String,
      enum: ['Admin', 'Guest', 'Editor'],
    },

    viewdBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

//Compile the User model

const User = mongoose.model('User', userSchema);

module.exports = User;
