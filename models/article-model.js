const db = require('../db/connection');

exports.fetchArticleID = (articleID) => {
    return db.query(`SELECT * FROM articles WHERE article_id=$1 ;`, [articleID])
    .then(({ rows }) => {
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'No content found'})
        }
        return rows;
    })
    .then((rows) => {
        return Promise.all([rows, db.query(`SELECT comment_id FROM comments WHERE article_id = $1 GROUP BY comment_id ;`, [articleID])])
    })
    .then(([ mainBody, commentCount]) => {
        mainBody[0].comment_count = commentCount.rows.length;
        return mainBody;
    })
}

exports.editArticleID = (article_id, inc_votes) => {
    if (typeof inc_votes !== 'number') {
        return Promise.reject({status: 400, msg: 'Inputted data not formatted correctly'})
    }
    return db.query('SELECT * FROM articles WHERE article_id=$1 ;', [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: 'No content found'})
        }
        rows[0].votes = rows[0].votes + inc_votes;
        const sanitisedVar = [rows[0].votes, article_id];
        return db.query('UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING * ;', sanitisedVar)
    })
    .then(({ rows }) => {
        return rows;
    })
}

exports.fetchArticles = () => {
    return db.query(`
    SELECT articles.article_id, articles.title, articles.votes, 
    articles.topic, articles.author, articles.created_at, 
    COUNT(comments.article_id) AS comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id 
    GROUP BY articles.article_id ;
    `)
    .then(({ rows }) => {
        return rows;
    })
}

//SELECT articles.article_id, articles.title, articles.votes, articles.topic, articles.author, articles.created_at, COUNT(comments.article_id) FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ;