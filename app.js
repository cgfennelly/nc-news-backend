const express = require('express');
const cors = require('cors');

const apiRouter = require('./routers/api-router');
const { handle500, customErrors, psqlErrors } = require('./controllers/error-handlers');


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", apiRouter);

app.all('*', (req, res) => {
    res.status(400).send({ msg: 'Path not found' });
});

app.use(customErrors);
app.use(psqlErrors);
app.use(handle500);

module.exports = app;