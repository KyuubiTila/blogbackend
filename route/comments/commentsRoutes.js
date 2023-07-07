const express = require('express');

const commentsRouter = express.Router();

// CREATE COMMENT
// POST/api/V1/comments
commentsRouter.post('/', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'comment created',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET INDIVIDUAL COMMENT
// GET/api/V1/comments/:id
commentsRouter.get('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'individual comment route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// DELETE INDIVIDUAL COMMENT
// DELETE/api/V1/comments/:id
commentsRouter.delete('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'delete comment route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// UPDATE INDIVIDUAL COMMENT
// PUT/api/V1/comments/:id
commentsRouter.put('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update comment route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = commentsRouter;
