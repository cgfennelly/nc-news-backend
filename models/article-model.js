const db = require('../db/connection');

exports.fetchArticleID = (articleID) => {
    return db.query(`SELECT * FROM articles WHERE article_id=$1 ;`, [articleID])
    .then(({ rows }) => {
        if(!rows[0]) {
            return Promise.reject({status: 404, msg: 'No content found'})
        }
        return rows;
    })
}