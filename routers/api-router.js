const { getAPI } = require('../controllers/api-controller');
const topicRouter = require('./topic-router');
const articleRouter = require('./article-router');

const apiRouter = require('express').Router();

apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.route('/').get(getAPI);

module.exports = apiRouter;