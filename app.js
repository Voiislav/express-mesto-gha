const express = require('express');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { ERROR_NOT_FOUND } = require('./utils/errorCodes');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use(auth);

app.post('/signin', login);

app.post('/signup', createUser);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).json({ error: 'Ничего не найдено' });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
