const apiMessage = require('./api-endpoints-summary.json');

exports.getAPI = (req, res) => {
    console.log(apiMessage);
    res.status(200).send(apiMessage);
}