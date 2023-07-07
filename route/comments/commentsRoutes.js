const express = require('express');
const {
  createCommentController,
  fetchIndividualCommentController,
  deleteIndividualCommentController,
  updateIndividualCommentController,
} = require('../../controllers/Comment/commentsControllers');
const commentsRouter = express.Router();

// CREATE COMMENT
// POST/api/V1/comments
commentsRouter.post('/', createCommentController);

// GET INDIVIDUAL COMMENT
// GET/api/V1/comments/:id
commentsRouter.get('/:id', fetchIndividualCommentController);

// DELETE INDIVIDUAL COMMENT
// DELETE/api/V1/comments/:id
commentsRouter.delete('/:id', deleteIndividualCommentController);

// UPDATE INDIVIDUAL COMMENT
// PUT/api/V1/comments/:id
commentsRouter.put('/:id', updateIndividualCommentController);

module.exports = commentsRouter;
