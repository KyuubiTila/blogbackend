const express = require('express');

const categoriesRouter = express.Router();

// CREATE CATEGORY
// POST/api/V1/categories
categoriesRouter.post('/', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'category created',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET INDIVIDUAL CATEGORY
// GET/api/V1/categories/:id
categoriesRouter.get('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'individual category route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// DELETE INDIVIDUAL CATEGORY
// DELETE/api/V1/categories/:id
categoriesRouter.delete('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'delete category route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// UPDATE CATEGORY
// PUT/api/V1/categories/:id
categoriesRouter.put('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update category route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = categoriesRouter;
