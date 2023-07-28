const Post = require('../../model/Post/Post');
const User = require('../../model/User/User');
const appError = require('../../utils/appError');

// CREATE INDIVIDUAL POST
const createIndividualPost = async (req, res, next) => {
  console.log(req.file);
  try {
    //destructure the element requird for the post creation from the request body
    const { title, description, category } = req.body;

    //1. Find user who is creating the post
    const author = await User.findById(req.userAuth);

    // check if user is blocked
    if (author.isBlocked) {
      return next(appError('Access denied, user  blocked', 403));
    }

    //2. CREATE THE POST
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
      photo: req?.file?.path,
    });

    //3. PUSH THE POST INTO THE POST BODY
    author.posts.push(postCreated);

    //4. SAVE THE USER MODEL AGAIN
    await author.save();
    res.json({
      status: 'success',
      data: postCreated,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// GET INDIVIDUAL POST
const fetchIndividualPost = async (req, res, next) => {
  try {
    // find the user viewing the post
    const userviewingPost = await User.findById(req.userAuth);

    // FIND THE POST
    const findPost = await Post.findById(req.params.id);
    console.log(findPost.numViews.length);
    // CHECK IF USER VIWED THE POST
    const isViewed = findPost.numViews.includes(userviewingPost);
    if (isViewed) {
      res.json({
        status: 'success',
        data: findPost,
      });
    } else {
      //PUSH THE USER INTO THE VIEWS ARRAY
      findPost.numViews.push(userviewingPost);
      await findPost.save();
      res.json({
        status: 'success',
        data: findPost,
      });
    }
  } catch (error) {
    return next(appError(error.message));
  }
};

// GET ALL POSTS
const fetchAllPosts = async (req, res, next) => {
  try {
    console.log(req.userAuth);
    // FIND ALL POSTS
    const allPosts = await Post.find({})
      .populate('user')
      // getting the actual field you want on the populated field, you specify after the field. In this case "title"
      .populate('category', 'title');

    // CHECK IF LOGGEDIN USER IS BLOCKED BY THE POST AUTHOR
    const filteredPosts = allPosts.filter((post) => {
      console.log(post);
      // get all blocked users
      const blockedUser = post.user[0].blocked;
      const isBlocked = blockedUser.includes(req.userAuth);
      console.log(isBlocked);
      // return !isBlocked;
      return isBlocked ? 'cant view post< user blocked you' : post;
    });
    res.json({
      status: 'success',
      data: filteredPosts,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// TOGGLE LIKE
const toggleLikesOfPost = async (req, res, next) => {
  try {
    // find the user liking the post
    // const userLkingPost = await User.findById(req.userAuth);

    // find the post being liked
    const post = await Post.findById(req.params.id);

    // check if user already liked the post
    const isLiked = post.likes.includes(req.userAuth);
    console.log(isLiked);

    // REMOVE USER'S LIKE
    if (isLiked) {
      post.likes = post.likes.filter((like) => like != req.userAuth);
      await post.save();
    } else {
      post.likes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// TOGGLE DISLIKE
const toggleDisikesOfPost = async (req, res, next) => {
  try {
    // find the user liking the post
    // const userLkingPost = await User.findById(req.userAuth);

    // find the post being liked
    const post = await Post.findById(req.params.id);
    console.log(post);

    // check if user already liked the post
    const isDisliked = post.disLikes.includes(req.userAuth);
    console.log(isDisliked);

    // REMOVE USER'S DISLIKE
    if (isDisliked) {
      //The filter method creates a new array containing all the elements of post.disLikes
      // except the one that matches req.userAuth. This effectively removes the user's dislike from the array
      post.disLikes = post.disLikes.filter(
        (dislike) => dislike != req.userAuth
      );
      await post.save();
    } else {
      post.disLikes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// UPDATE INDIVIDUAL POST
const updateIndividualPost = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //FIND USER WHO IS UPDATING POST
    const postUpdater = await User.findById(req.userAuth);

    // FIND POST TO BE UPDATED
    const postToBeUpdated = await Post.findById(req.params.id);

    if (postToBeUpdated.user.toString() !== postUpdater._id.toString()) {
      return next(
        appError('you can not update this post, you did not publish it', 403)
      );
    }
    await Post.findOneAndUpdate(
      postToBeUpdated._id,
      {
        title,
        description,
        category,
        photo: req?.file?.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: 'success',
      data: postToBeUpdated,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// DELETE INDIVIDUAL POST
const deleteIndividualPost = async (req, res, next) => {
  try {
    //FIND USER WHO IS DELETING POST
    const postDeleter = await User.findById(req.userAuth);

    // FIND POST TO BE DELETED
    const postToBeDeleted = await Post.findById(req.params.id);
    console.log(postToBeDeleted.user.toString());
    console.log(postDeleter._id.toString());

    if (postToBeDeleted.user.toString() !== postDeleter._id.toString()) {
      return next(
        appError('you can not delete this post, you did not publish it', 403)
      );
    } else {
      await postToBeDeleted.deleteOne();
      // await Post.findByIdAndDelete(req.params.id);
    }
    // if (postDeleter && postToBeDeleted) {

    // }
    res.json({
      status: 'success',
      data: 'you have deleted your post successfully',
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

module.exports = {
  createIndividualPost,
  fetchIndividualPost,
  fetchAllPosts,
  updateIndividualPost,
  deleteIndividualPost,
  toggleLikesOfPost,
  toggleDisikesOfPost,
};
