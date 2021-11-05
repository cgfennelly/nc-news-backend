const db = require('../db/connection');

exports.removeComment = (comment_id) => {
    return db.query(`DELETE FROM comments WHERE comment_id=$1 ;`, [comment_id])
    .then(() => {
        return db.query(`SELECT COUNT(comment_id) FROM comments ;`)
    })
    .then(({ rows }) => {
        return rows;
    })
}