const app = require('./app');

const { PORT = 8989} = process.env;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`listening on ${PORT}`)
});