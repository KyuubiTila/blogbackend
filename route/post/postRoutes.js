const express = require('express');

const postRouter = express.Router();

// CREATE INDIVIDUAL POST
// POST/api/V1/posts
postRouter.post('/', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'post created',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET INDIVIDUAL POST
// GET/api/V1/posts/:id
postRouter.get('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'post route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// GET ALL POSTS
// GET/api/V1/posts
postRouter.get('posts', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'all posts route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// UPDATE INDIVIDUAL POST
// PUT/api/V1/posts/:id
postRouter.put('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'update post route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

// DELETE INDIVIDUAL POST
// DELETE/api/V1/posts/:id
postRouter.delete('/:id', async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: 'delete post route',
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = postRouter;
