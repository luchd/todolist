const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/style.scss', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/style.scss'));
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