const { fetchArticleID, editArticleID, fetchArticles, fetchArticleIDComments } = require('../models/article-model');

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

    const sortByPermissible = ['article_id', 'title', 'votes', 'topic', 'author', 'created_at', 'comment_count'];

    if (sort_by && !sortByPermissible.includes(sort_by)) {
        throw ({status: 400, msg: 'Bad parameter passed'});
    }
    if (order && order !== 'ASC' && order !== 'DESC') {
        throw ({status: 400, msg: 'Bad parameter passed'});
    }
    
    fetchArticles(sort_by, order, topic)
    .then((articles) => {
        res.status(200).send({articles});
    })
    .catch(next);
}

exports.getArticleIDComments = (req, res, next) => {
    
    const { article_id } = req.params;

    fetchArticleIDComments(article_id)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next);
}

exports.postArticleIDComment = (req, res, next) => {
    
}