const { fetchArticleID } = require('../models/article-model');

exports.getArticleID = (req, res, next) => {

    const articleID = req.params.article_id;
    //could refactor this as const { article_id } = req.params??

    fetchArticleID(articleID)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(next);
}