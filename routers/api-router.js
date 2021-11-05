const { getAPI } = require('../controllers/api-controller');
const topicRouter = require('./topic-router');
const articleRouter = require('./article-router');
const commentRouter = require('./comment-router');

const apiRouter = require('express').Router();

apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.route('/').get(getAPI);

module.exports = apiRouter;