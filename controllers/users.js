const User = require('../models/user');

const { sendErrorResponse } = require('../errorResponse');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.json({ data: user });
    })
    .catch((error) => {
      if (error.statusCode === 400) {
        return sendErrorResponse(res, error.statusCode, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find().then((users) => {
    res.json(users);
  }).catch((error) => {
    sendErrorResponse(res, error.statusCode, error.message);
  });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params.userId;

  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        return sendErrorResponse(res, error.statusCode, 'Запрашиваемый пользователь не найден');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        return sendErrorResponse(res, error.statusCode, 'Запрашиваемый пользователь не найден');
      } else if (error.statusCode === 400) {
        return sendErrorResponse(res, error.statusCode, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        return sendErrorResponse(res, error.statusCode, 'Запрашиваемый пользователь не найден');
      } else if (error.statusCode === 400) {
        return sendErrorResponse(res, error.statusCode, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};
