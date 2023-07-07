// CREATE INDIVIDUAL POST
const createIndividualPost = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'post created',
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
