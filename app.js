const express = require('express');

const apiRouter = require('./routers/api-router');
const { handle500 } = require('./controllers/error-handlers');

const app = express();


app.use("/api", apiRouter);


app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Path not found' });
});

app.use(handle500);

module.exports = app;