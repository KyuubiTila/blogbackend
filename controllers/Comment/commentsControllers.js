const Comment = require('../../model/Comment/Comment');
const Post = require('../../model/Post/Post');
const User = require('../../model/User/User');
const appError = require('../../utils/appError');

// CREATE COMMENT
const createCommentController = async (req, res, next) => {
  const { description } = req.body;
  try {
    // FIND USER WHO IS CREATING THE COMMENT
    const commentCreator = await User.findById(req.userAuth);

    //FIND THE POST TO BE COMMENTED ON
    const commentPost = await Post.findById(req.params.id);

    // CREATE COMMENT
    const comment = await Comment.create({
      post: commentPost._id,
      description,
      user: commentCreator._id,
    });

    // PUSH THE COMMENT TO POST
    commentPost.comments.push(comment._id);

    // PUSH THE COMMENT TO USER
    commentCreator.comments.push(comment._id);

    // SAVE COMMENT
    await commentCreator.save();
    await commentPost.save();

    res.json({
      status: 'success',
      data: comment,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// GET INDIVIDUAL COMMENT
const fetchIndividualCommentController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'individual comment route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// DELETE INDIVIDUAL COMMENT
const deleteIndividualCommentController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'delete comment route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// UPDATE INDIVIDUAL COMMENT
const updateIndividualCommentController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update comment route',
    });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  createCommentController,
  fetchIndividualCommentController,
  deleteIndividualCommentController,
  updateIndividualCommentController,
};
