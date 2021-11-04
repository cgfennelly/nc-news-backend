const { getArticleID, patchArticleID, getArticles, getArticleIDComments, postArticleIDComment } = require('../controllers/article-controller');

const articleRouter = require('express').Router();

//articleRouter.route('/').get(getArticles);

articleRouter.route('/:article_id')
.get(getArticleID)
.patch(patchArticleID);

articleRouter.route('/:article_id/comments')
.get(getArticleIDComments)
.post(postArticleIDComment);


articleRouter.use('/', getArticles);


module.exports = articleRouter;