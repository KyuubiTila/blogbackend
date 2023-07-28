const express = require('express');
const {
  createIndividualPost,
  fetchIndividualPost,
  fetchAllPosts,
  updateIndividualPost,
  deleteIndividualPost,
  toggleLikesOfPost,
  toggleDisikesOfPost,
} = require('../../controllers/Post/postController');
const isLoggedIn = require('../../middlewares/isLoggedin');
const postRouter = express.Router();
const multer = require('multer');
const storage = require('../../config/cloudinary');

// FILE UPLOAD
const upload = multer({ storage });

// CREATE INDIVIDUAL POST
// POST/api/V1/posts
// to create the post, express has to go through the loggedin middleware and check has to be in place before nexting
// you can not comment when not logged in
postRouter.post('/', isLoggedIn, upload.single('image'), createIndividualPost);

// GET INDIVIDUAL POST
// GET/api/V1/posts/:id
postRouter.get('/:id', isLoggedIn, fetchIndividualPost);

// GET ALL POSTS
// GET/api/V1/posts
postRouter.get('/', isLoggedIn, fetchAllPosts);

// GET LIKES
// GET/api/V1/posts/likes/:id
postRouter.get('/likes/:id', isLoggedIn, toggleLikesOfPost);

// GET DISLIKES
// GET/api/V1/posts/dislikes/:id
postRouter.get('/dislikes/:id', isLoggedIn, toggleDisikesOfPost);

// UPDATE INDIVIDUAL POST
// PUT/api/V1/posts/:id
postRouter.put('/:id', updateIndividualPost);

// DELETE INDIVIDUAL POST
// DELETE/api/V1/posts/:id
postRouter.delete('/:id', deleteIndividualPost);

module.exports = postRouter;
