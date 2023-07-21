const express = require('express');
const {
  createIndividualPost,
  fetchIndividualPost,
  fetchAllPosts,
  updateIndividualPost,
  deleteIndividualPost,
} = require('../../controllers/Post/postController');
const isLoggedIn = require('../../middlewares/isLoggedin');
const postRouter = express.Router();

// CREATE INDIVIDUAL POST
// POST/api/V1/posts
// to create the post, express has to go through the loggedin middleware and check has to be in place before nexting
// you can not comment when not logged in
postRouter.post('/', isLoggedIn, createIndividualPost);

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
