const User = require('../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { sendErrorResponse } = require('../utils/errorResponse');

const { ERROR_NOT_FOUND, ERROR_BAD_REQUEST, SERVER_ERROR, ERROR_UNAUTHORIZED } = require('../utils/errorCodes');

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

module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return sendErrorResponse(res, ERROR_NOT_FOUND, 'Запрашиваемый пользователь не найден');
      }

      res.json(user);
    })
    .catch((error) => {
      return sendErrorResponse(res, ERROR_BAD_REQUEST, error.message);
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email })
  .then((user) => {
    if (!user) {
      return Promise.reject({ ERROR_UNAUTHORIZED: true, message: 'Неправильные почта или пароль' });
    }
    return bcrypt.compare(password, user.password);
  })
  .then((matched) => {
    if (!matched) {
      return Promise.reject({ ERROR_UNAUTHORIZED: true, message: 'Неправильные почта или пароль' });
    }
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ message: 'Авторизация прошла успешно', token });
  })
  .catch((error) => {
    return sendErrorResponse(res, SERVER_ERROR, error.message);
  });
};
