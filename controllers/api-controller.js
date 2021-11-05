const apiMessage = require('./api-endpoints-summary.json');

exports.getAPI = (req, res) => {
    res.status(200).send(apiMessage);
}