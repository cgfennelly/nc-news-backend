exports.customErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg});
    } else next(err)
}

exports.psqlErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: "Bad parameter passed"});
    } else next(err)
}

// exports.psqlErrors = (err, req, res, next) => {
//     if (err.code === '23503') {
//         res.status(404).send({msg: "No content found"});
//     } else next(err)
// }

exports.handle500 = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: "server error"} );
}