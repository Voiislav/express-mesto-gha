const User = require('../models/user');

const { sendErrorResponse } = require('../utils/errorResponse');

const { ERROR_NOT_FOUND, ERROR_BAD_REQUEST } = require('../utils/errorCodes');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.json({ data: user });
    })
    .catch((error) => {
      if (error.statusCode === ERROR_BAD_REQUEST) {
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
      if (error.statusCode === ERROR_NOT_FOUND) {
        return sendErrorResponse(res, error.statusCode, 'Запрашиваемый пользователь не найден');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.statusCode === ERROR_NOT_FOUND) {
        return sendErrorResponse(res, error.statusCode, 'Запрашиваемый пользователь не найден');
      } else if (error.statusCode === ERROR_BAD_REQUEST) {
        return sendErrorResponse(res, error.statusCode, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.statusCode === ERROR_NOT_FOUND) {
        return sendErrorResponse(res, error.statusCode, 'Запрашиваемый пользователь не найден');
      } else if (error.statusCode === ERROR_BAD_REQUEST) {
        return sendErrorResponse(res, error.statusCode, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};
