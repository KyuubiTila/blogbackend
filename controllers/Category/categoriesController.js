const Category = require('../../model/Categories/Category');
const User = require('../../model/User/User');
const appError = require('../../utils/appError');

// CREATE CATEGORY
const createCategoryController = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.create({ title, user: req.userAuth });

    res.json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// GET ALL CATEGORY
const fetchAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json({
      status: 'success',
      data: categories,
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
  fetchAllCategoriesController,
};
