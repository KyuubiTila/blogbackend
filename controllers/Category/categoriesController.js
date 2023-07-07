// CREATE COMMENT
const createCategoryController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'category created',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// GET INDIVIDUAL CATEGORY
const fetchIndividualCategoryController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'individual category route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// DELETE INDIVIDUAL CATEGORY
const deleteIndividualCategoryController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'delete category route',
    });
  } catch (error) {
    res.json(error.message);
  }
};

// UPDATE INDIVIDUAL CATEGORY
const updateIndividualCategoryController = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update category route',
    });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  createCategoryController,
  fetchIndividualCategoryController,
  deleteIndividualCategoryController,
  updateIndividualCategoryController,
};
