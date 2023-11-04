const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.get('/style.css', (req, res) => {
    console.log('rendering ../client/style.css');
    res.sendFile(path.join(__dirname, '../client/style.css'));
});

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;