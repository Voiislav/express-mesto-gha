const User = require('../models/user.js');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => {
      res.status(201).send({ data: user })
    })
    .catch(error => {
      res.status(500).send({ error: 'Ошибка при создании пользователя' })
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find()
  .then(users => {
    res.json(users);
  })
  .catch(error => {
    res.status(500).json({ error: 'Ошибка при попытке вернуть данные' });
  });
};

module.exports.getUserById = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Ошибка при попытке вернуть данные' });
    });
};
