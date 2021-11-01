exports.getAPI = (req, res) => {
    res.status(200).send({ msg: 'Welcome to the API homepage' });
}