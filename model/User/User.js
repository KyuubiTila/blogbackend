// const { default: mongoose } = require('mongoose');

const mongoose = require('mongoose');

// create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
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

    // postCount: {
    //   type: Number,
    //   default: 0,
    // },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ['Admin', 'Guest', 'Editor'],
    },

    viewers: [
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

    // active: {
    //   type: Boolean,
    //   default: true,
    // },
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    plan: [
      {
        type: String,
        enum: ['free', 'premium', 'pro'],
        default: 'free',
      },
    ],
    userAward: [
      {
        type: String,
        enum: ['bronze', 'silver', 'gold'],
        default: 'bronze',
      },
    ],
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// GET FULLNAME
userSchema.virtual('fullname').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

//Compile the User model

const User = mongoose.model('User', userSchema);

module.exports = User;
