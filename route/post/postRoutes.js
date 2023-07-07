const express = require('express');
const {
  createIndividualPost,
  fetchIndividualPost,
  fetchAllPosts,
  updateIndividualPost,
  deleteIndividualPost,
} = require('../../controllers/Post/postController');
const postRouter = express.Router();

// CREATE INDIVIDUAL POST
// POST/api/V1/posts
postRouter.post('/', createIndividualPost);

// GET INDIVIDUAL POST
// GET/api/V1/posts/:id
postRouter.get('/:id', fetchIndividualPost);

// GET ALL POSTS
// GET/api/V1/posts
postRouter.get('/', fetchAllPosts);

// UPDATE INDIVIDUAL POST
// PUT/api/V1/posts/:id
postRouter.put('/:id', updateIndividualPost);

// DELETE INDIVIDUAL POST
// DELETE/api/V1/posts/:id
postRouter.delete('/:id', deleteIndividualPost);

module.exports = postRouter;
