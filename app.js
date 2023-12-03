const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});