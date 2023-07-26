// const { default: mongoose } = require('mongoose');

const mongoose = require('mongoose');
const appError = require('../../utils/appError');
const Post = require('../Post/Post');

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
    // plan: {
    //   type: String,
    //   enum: ['free', 'premium', 'pro'],
    //   default: 'free',
    // },

    userAward: [
      {
        type: String,
        enum: ['bronze', 'silver', 'gold'],
        default: 'bronze',
      },
    ],

    loginTimestamp: { type: Date, default: Date.now() },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// HOOKS
//PRE before record is saved and its queries are find/findOne
// userSchema.pre('findOne', async function (next) {
//   const queryConditions = this._conditions;
//   const { email } = queryConditions;

//   try {

//     next();
//   } catch (error) {
//     throw error;
//   }
// });

// // POST after saving

// userSchema.post('save', function (next) {
//   console.log('post hook');
//   // next();
// });

// VIRTUAL ATTRIBUTES
// GET FULLNAME
userSchema.virtual('fullname').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// GET INITIALS
userSchema.virtual('initials').get(function () {
  return `${this.firstName[0].toUpperCase()}${this.lastName[0].toUpperCase()}`;
});

// GET POST COUNT
userSchema.virtual('postCounts').get(function () {
  return this.posts.length;
});

// GET FOLLOWING COUNT
userSchema.virtual('followingCount').get(function () {
  return this.following.length;
});

// GET FOLLOWERS COUNT
userSchema.virtual('followersCount').get(function () {
  return this.followers.length;
});

// GET VIEWERS COUNT
userSchema.virtual('viewersCount').get(function () {
  return this.viewers.length;
});

userSchema.virtual('lastLoggedInTime').get(function () {
  return this.loginTimestamp.toDateString();
});

userSchema.virtual('isInActive').get(function () {
  const currentDate = new Date();
  const differencesInDates = currentDate - this.loginTimestamp;
  const differenceInDays = differencesInDates / (1000 * 3600 * 24);
  return differenceInDays >= 30;
});

// GET BLOCKED USERS COUNT
userSchema.virtual('blockedCount').get(function () {
  return this.blocked.length;
});

//Compile the User model

const User = mongoose.model('User', userSchema);

module.exports = User;
