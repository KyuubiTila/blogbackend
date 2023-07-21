const Post = require('../../model/Post/Post');
const User = require('../../model/User/User');

// CREATE INDIVIDUAL POST
const createIndividualPost = async (req, res) => {
  try {
    //destructure the element requird for the post creation from the request body
    const { title, description } = req.body;

    //1. Find user who is creating the post
    const author = await User.findById(req.userAuth);

    //2. CREATE THE POST
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
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
    res.json(error.message);
  }
};

// GET INDIVIDUAL POST
const fetchIndividualPost = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'post route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// GET ALL POSTS
const fetchAllPosts = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'all posts route',
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
};
