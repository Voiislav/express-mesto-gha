const Card = require('../models/card');

const { sendErrorResponse } = require('../utils/errorResponse');

const { ERROR_NOT_FOUND, ERROR_BAD_REQUEST, SERVER_ERROR } = require('../utils/errorCodes');

module.exports.getAllCards = (req, res) => {
  Card.find().then((cards) => {
    res.json(cards);
  }).catch((error) => {
    sendErrorResponse(res, SERVER_ERROR, error.message);
  });
};

module.exports.createCard = (req, res) => {
  const {
    name, link, owner, likes, createdAt,
  } = req.body;
  Card.create({ name, link })
    .then((card) => {
      res.json({ data: card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return sendErrorResponse(res, ERROR_BAD_REQUEST, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, SERVER_ERROR, error.message);
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params.cardId;

  Card.findByIdAndDelete(cardId)
    .then(() => {
      res.json({ message: 'Карточка успешно удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return sendErrorResponse(res, ERROR_NOT_FOUND, 'Карточка не найдена');
      }
      return sendErrorResponse(res, SERVER_ERROR, error.message);
    });
};

module.exports.addLike = (req, res) => {
  const { cardId } = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.json(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return sendErrorResponse(res, ERROR_NOT_FOUND, 'Карточка не найдена');
      }
      return sendErrorResponse(res, SERVER_ERROR, error.message);
    });
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.json(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return sendErrorResponse(res, ERROR_NOT_FOUND, 'Карточка не найдена');
      }
      return sendErrorResponse(res, SERVER_ERROR, error.message);
    });
};
