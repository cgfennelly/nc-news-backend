const { getAPI } = require('../controllers/api-controller');

const apiRouter = require('express').Router();

apiRouter.route('/').get(getAPI);

module.exports = apiRouter;