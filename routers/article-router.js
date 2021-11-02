const { getArticleID, patchArticleID } = require('../controllers/article-controller');

const articleRouter = require('express').Router();

articleRouter.route('/:article_id').get(getArticleID);
articleRouter.route('/:article_id').patch(patchArticleID);

module.exports = articleRouter;