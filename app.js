const express = require("express");
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});