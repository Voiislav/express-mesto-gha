const User = require('../models/user');

const bcrypt = require('bcrypt');

const { sendErrorResponse } = require('../utils/errorResponse');

const { ERROR_NOT_FOUND, ERROR_BAD_REQUEST, SERVER_ERROR } = require('../utils/errorCodes');

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  const hash = bcrypt.hash(password, 10);
  User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })
    .then((user) => {
      res.json({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return sendErrorResponse(res, ERROR_BAD_REQUEST, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, SERVER_ERROR, error.message);
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find().then((users) => {
    res.json(users);
  }).catch((error) => {
    sendErrorResponse(res, SERVER_ERROR, error.message);
  });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params.userId;

  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return sendErrorResponse(res, ERROR_NOT_FOUND, 'Запрашиваемый пользователь не найден');
      }
      return sendErrorResponse(res, SERVER_ERROR, error.message);
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return sendErrorResponse(res, ERROR_NOT_FOUND, 'Запрашиваемый пользователь не найден');
      } else if (error.name === 'ValidationError') {
        return sendErrorResponse(res, ERROR_BAD_REQUEST, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, SERVER_ERROR, error.message);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return sendErrorResponse(res, ERROR_NOT_FOUND, 'Запрашиваемый пользователь не найден');
      } else if (error.name === 'ValidationError') {
        return sendErrorResponse(res, ERROR_BAD_REQUEST, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, SERVER_ERROR, error.message);
    });
};
