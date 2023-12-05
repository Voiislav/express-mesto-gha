const Card = require('../models/card');

const { sendErrorResponse } = require('../errorResponse');

module.exports.getAllCards = (req, res) => {
  Card.find().then((cards) => {
    res.json(cards);
  }).catch((error) => {
    sendErrorResponse(res, error.statusCode, error.message);
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
      if (error.statusCode === 400) {
        return sendErrorResponse(res, error.statusCode, 'Переданы некорректные данные');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params.cardId;

  Card.findByIdAndDelete(cardId)
    .then(() => {
      res.json({ message: 'Карточка успешно удалена' });
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        return sendErrorResponse(res, error.statusCode, 'Карточка не найдена');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};

module.exports.addLike = (req, res) => {
  const { cardId } = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.json(card);
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        return sendErrorResponse(res, error.statusCode, 'Карточка не найдена');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};

module.exports.removeLike = (req, res) => {
  const { cardId } = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.json(card);
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        return sendErrorResponse(res, error.statusCode, 'Карточка не найдена');
      }
      return sendErrorResponse(res, error.statusCode, error.message);
    });
};
