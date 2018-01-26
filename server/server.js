const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './public')));

console.log('ROUTER: ' + require('./routes/index'));
app.use(require('./routes/index'));

app.use((req, res, next) => {
  res.status(404).send('<h1>404</h1>');
});

app.use((req, res, next) => {
  res.status(500).send('<h1>Internal server error</h1>');
});

const server = app.listen(3000, () => {
  console.log('Listening to port: ' + server.address().port);
});