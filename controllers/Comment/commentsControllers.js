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
const deleteIndividualCommentController = async (req, res, next) => {
  try {
    // FIND USER UPDATING A COMMENT
    const commentDeleter = await User.findById(req.userAuth);
    console.log(commentDeleter._id);
    // FIND COMMENT TO BE UPDATED
    const commentToBeDeleted = await Comment.findById(req.params.id);
    console.log(commentToBeDeleted.user._id);

    if (
      commentDeleter._id.toString() !== commentToBeDeleted.user._id.toString()
    ) {
      return next(
        appError('You can not update this comment, you did not create it')
      );
    }

    await Comment.findByIdAndDelete(commentToBeDeleted._id);
    res.json({
      status: 'success',
      data: 'comment deleted successfully',
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// UPDATE INDIVIDUAL COMMENT
const updateIndividualCommentController = async (req, res, next) => {
  const { description } = req.body;

  try {
    // FIND USER UPDATING A COMMENT
    const commentUpdater = await User.findById(req.userAuth);
    console.log(commentUpdater._id);
    // FIND COMMENT TO BE UPDATED
    const commentToBeUpdated = await Comment.findById(req.params.id);
    console.log(commentToBeUpdated.user._id);

    if (
      commentUpdater._id.toString() !== commentToBeUpdated.user._id.toString()
    ) {
      return next(
        appError('You can not update this comment, you did not create it')
      );
    }

    const category = await Comment.findByIdAndUpdate(
      commentToBeUpdated._id,
      { description },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};
module.exports = {
  createCommentController,
  fetchIndividualCommentController,
  deleteIndividualCommentController,
  updateIndividualCommentController,
};
