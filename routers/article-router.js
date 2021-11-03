const { getArticleID, patchArticleID, getArticles, getArticleIDComments } = require('../controllers/article-controller');

const articleRouter = require('express').Router();

//articleRouter.route('/').get(getArticles);

articleRouter.route('/:article_id').get(getArticleID);
articleRouter.route('/:article_id/comments').get(getArticleIDComments);
articleRouter.route('/:article_id').patch(patchArticleID);

articleRouter.use('/', getArticles);


module.exports = articleRouter;