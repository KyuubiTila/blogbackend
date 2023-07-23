const express = require('express');
const {
  createCategoryController,
  fetchIndividualCategoryController,
  deleteIndividualCategoryController,
  updateIndividualCategoryController,
  fetchAllCategoriesController,
} = require('../../controllers/Category/categoriesController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const categoriesRouter = express.Router();

// CREATE CATEGORY
// POST/api/V1/categories
categoriesRouter.post('/', isLoggedIn, createCategoryController);

// GET ALL CATEGORIES
// GET/api/V1/categories/:id
categoriesRouter.get('/', isLoggedIn, fetchAllCategoriesController);

// GET INDIVIDUAL CATEGORY
// GET/api/V1/categories/:id
categoriesRouter.get('/:id', isLoggedIn, fetchIndividualCategoryController);

// DELETE INDIVIDUAL CATEGORY
// DELETE/api/V1/categories/:id
categoriesRouter.delete('/:id', deleteIndividualCategoryController);

// UPDATE CATEGORY
// PUT/api/V1/categories/:id
categoriesRouter.put('/:id', updateIndividualCategoryController);

module.exports = categoriesRouter;
