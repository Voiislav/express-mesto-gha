const User = require('../models/user.js');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => {
      res.send({ data: user })
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка при создании пользователя' })
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
    .catch(() => {
      res.status(500).json({ message: 'Запрашиваемый пользователь не найден' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Ошибка при обновлении профиля пользователя' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: 'Ошибка при обновлении аватара пользователя' });
    });
};
