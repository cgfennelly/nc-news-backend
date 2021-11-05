const { deleteComment } = require('../controllers/comment-controller');

const commentRouter = require('express').Router();

commentRouter.route('/:comment_id')
.delete(deleteComment);

module.exports = commentRouter;