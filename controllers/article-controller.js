const { fetchArticleID } = require('../models/article-model');

exports.getArticleID = (req, res, next) => {

    const articleID = req.params.article_id;

    fetchArticleID(articleID)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(next);
}