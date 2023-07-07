// CREATE COMMENT
const createCommentController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'comment created',
    });
  } catch (error) {
    res.json(error.message);
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
