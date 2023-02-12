const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/collections', (req, res) => {
  res.render('pages/collections');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
