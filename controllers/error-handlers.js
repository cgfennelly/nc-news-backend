exports.customErrors = (err, req, res, next) => {
    console.log("THIS ONE -->", err.msg);
    console.log(err.status)
    if (err.status) {
        console.log('The error status exists - custom error')
        console.log(err.msg)
        res.status(err.status).send(err.msg);
    } else next(err)
}

exports.psqlErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: "Bad parameter passed"});
    } else next(err)
}

exports.handle500 = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: "server error"} );
}