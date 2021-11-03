const { fetchArticleID, editArticleID, fetchArticles } = require('../models/article-model');

exports.getArticleID = (req, res, next) => {

    const articleID = req.params.article_id;

    fetchArticleID(articleID)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(next);
}

exports.patchArticleID = (req, res, next) => {

    const { article_id } = req.params;
    const { inc_votes } = req.body;

    if (Object.keys(req.body).length > 1) {
        throw ({status: 400, msg: 'Inputted data not formatted correctly'});
    }

    editArticleID(article_id, inc_votes)
    .then((article) => {
        res.status(200).send({article});
    })
    .catch(next);
}

exports.getArticles = (req, res, next) => {
    
    const { sort_by } = req.query;
    const { order } = req.query;
    const { topic } = req.query;
    
    fetchArticles(sort_by, order, topic)
    .then((articles) => {
        res.status(200).send({articles});
    })
}