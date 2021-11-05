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

exports.fetchArticles = (sort_by = 'created_at', order = 'DESC', topic) => {
    
    return Promise.all([sort_by, order, topic, db.query(`SELECT DISTINCT topic FROM articles ;`)])
    .then(([sort_by, order, topic, { rows }]) => {
        const topicsInDB = rows
        
        let topicCheck = false;
        for (const element of topicsInDB) {
            if (Object.values(element).indexOf(topic) > -1) topicCheck = true;
        }
        if(topic && topicCheck === false) {
            return Promise.reject({status: 400, msg: "Bad parameter passed"});
        }

        let queryStr = `SELECT articles.article_id, articles.title, articles.votes, 
        articles.topic, articles.author, articles.created_at, 
        COUNT(comments.article_id) AS comment_count 
        FROM articles 
        LEFT JOIN comments 
        ON comments.article_id = articles.article_id `;

        if (topic ) {
            queryStr += `WHERE articles.topic='${topic}' `
        }

        queryStr += `GROUP BY articles.article_id 
        ORDER BY articles.${sort_by} ${order} ;`
        
        return db.query(queryStr)
        .then(({ rows }) => {
            return rows;
        })
    })
}

exports.fetchArticleIDComments = (article_id) => {

    return db.query(`SELECT comments.article_id, comments.comment_id, 
    comments.votes, comments.created_at, comments.author, comments.body 
    FROM comments  
    WHERE comments.article_id=$1 ;`, [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "No content found"});
        }
        return rows;
    })

}

exports.submitArticleIDComment = (article_id, comment) => {
    return db.query(`INSERT INTO comments 
    (body, votes, author, article_id) 
    VALUES 
    ($1, 1, $2, $3) RETURNING * ;`, [comment.body, comment.username, article_id])
    .then(({ rows }) => {
        return rows;
    })
}