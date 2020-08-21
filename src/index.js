const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api/v1', routes);

app.get('/', (req, res) => res.status(301).redirect('/api/v1'))

app.use('*', (req, res) =>
  res.status(404).json({
    status: res.statusCode,
    error: 'Resource not found. Double check the url and try again',
  })
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
