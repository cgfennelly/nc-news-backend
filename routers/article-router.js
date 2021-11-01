const { getArticleID } = require('../controllers/article-controller');

const articleRouter = require('express').Router();

articleRouter.route('/:article_id').get(getArticleID);

module.exports = articleRouter;