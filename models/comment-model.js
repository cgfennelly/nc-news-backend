const db = require('../db/connection');

exports.removeComment = (comment_id) => {

    return Promise.all([comment_id, db.query(`SELECT comment_id FROM comments WHERE comment_id=$1 ;`, [comment_id])])
    .then(([comment_id, commentExistsQuery]) => {
        
        if (commentExistsQuery.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'No content found'})
        }

        return db.query(`DELETE FROM comments WHERE comment_id=$1 ;`, [comment_id])
        .then(({ rows }) => {
            return rows
        })
    })
}