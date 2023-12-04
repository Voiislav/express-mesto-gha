const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users.js'));
app.use('/cards', require('./routes/cards.js'));

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});