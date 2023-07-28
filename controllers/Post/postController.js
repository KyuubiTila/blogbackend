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
const fetchIndividualPost = async (req, res) => {
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
    res.json(error.message);
  }
};

// GET ALL POSTS
const fetchAllPosts = async (req, res) => {
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
    res.json(error.message);
  }
};

// TOGGLE LIKE
const toggleLikesOfPost = async (req, res) => {
  try {
    // find the user liking the post
    // const userLkingPost = await User.findById(req.userAuth);

    // find the post being liked
    const post = await Post.findById(req.params.id);

    // check if user already liked the post
    const isLiked = post.likes.includes(req.userAuth);
    console.log(isLiked);

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
    res.json(error.message);
  }
};

// TOGGLE DISLIKE
const toggleDisikesOfPost = async (req, res) => {
  try {
    // find the user liking the post
    // const userLkingPost = await User.findById(req.userAuth);

    // find the post being liked
    const post = await Post.findById(req.params.id);

    // check if user already liked the post
    const isDisliked = post.disLikes.includes(req.userAuth);
    console.log(isDisliked);

    if (isDisliked) {
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
    res.json(error.message);
  }
};

// UPDATE INDIVIDUAL POST
const updateIndividualPost = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update post route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// DELETE INDIVIDUAL POST
const deleteIndividualPost = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'delete post route',
    });
  } catch (error) {
    res.json(error.message);
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
