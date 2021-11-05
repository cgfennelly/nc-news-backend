const { removeComment } = require("../models/comment-model");

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;

    removeComment(comment_id)
    .then((comment_count) => {
        //console.log(comment_count)
        res.status(204).send();
    })
}