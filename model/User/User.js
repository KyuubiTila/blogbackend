// const { default: mongoose } = require('mongoose');

const mongoose = require('mongoose');
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
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// HOOKS
//PRE before record is saved and its queries are find/findOne
userSchema.pre('findOne', async function (next) {
  // get the user id
  const userId = this._conditions._id;

  // find the post created by the user
  const posts = await Post.find({ user: userId });

  // get the last post created by the user
  const lastPost = posts[posts.length - 1];

  // get the last post date
  const lastPostDate = new Date(lastPost.createdAt);

  // get the last post date in strig format
  const lastPostDateString = lastPostDate.toDateString();

  // add the last post date as a virtual to the schema
  userSchema.virtual('lastPostDate').get(function () {
    return lastPostDateString;
  });

  // ---------------------check if user is inactive for 30 days -------------------
  //check for the current date
  const currentDate = new Date();
  // check the diference between the last post date and the current date
  const dirrenceInDates = currentDate - lastPostDate;

  // convert to differnces in days
  const differenceInDAys = dirrenceInDates / (1000 * 3600 * 24);

  // compare to 30 days
  if (30 > differenceInDAys) {
    // push a virtual property by mongoose about being Inactive
    userSchema.virtual('isInActive').get(function () {
      return false;
    });
    // find the user by Id and update
    await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
  } else {
    // push a virtual property by mongoose about being Inactive
    userSchema.virtual('isInActive').get(function () {
      return true;
    });
    // find the user by Id and update
    await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
  }

  // -------------- BLOCKING OF USER IF INCATIVE FOR 30 DAYS ---------------
  next();
});

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

// GET BLOCKED USERS COUNT
userSchema.virtual('blockedCount').get(function () {
  return this.blocked.length;
});

//Compile the User model

const User = mongoose.model('User', userSchema);

module.exports = User;
