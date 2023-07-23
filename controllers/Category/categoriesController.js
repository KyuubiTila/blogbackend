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
const fetchAllCategoriesController = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.json({
      status: 'success',
      data: categories,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};

// GET INDIVIDUAL CATEGORY
const fetchIndividualCategoryController = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    res.json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    return next(appError(error.message));
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
const updateIndividualCategoryController = async (req, res, next) => {
  const { title } = req.body;
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: 'success',
      data: updateCategory,
    });
  } catch (error) {
    return next(appError(error.message));
  }
};
module.exports = {
  createCategoryController,
  fetchIndividualCategoryController,
  deleteIndividualCategoryController,
  updateIndividualCategoryController,
  fetchAllCategoriesController,
};
