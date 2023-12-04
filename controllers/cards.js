const Card = require('../models/card.js');
const { sendErrorResponse } = require('../errorResponse.js');
 
module.exports.getAllCards = (req, res) => {
  Card.find()
  .then(cards => {
    res.json(cards);
  })
  .catch(error => {
    sendErrorResponse(res, 500, 'Ошибка при попытке вернуть данные');
  });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner, likes, createdAt } = req.body;
  if (!name || !link) {
    return sendErrorResponse(res, 400, 'Переданы некорректные данные для создания карточки');
  }
  Card.create({ name, link })
    .then(card => {
      res.status(201).json({ data: card });
    })
    .catch(error => {
      sendErrorResponse(res, 500, 'Ошибка при создании карточки');
    });
};

module.exports.deleteCard = (req, res) => {
  const cardId = req.params.cardId;
  Card.findByIdAndDelete(cardId)
    .then(card => {
      if (!card) {
        return sendErrorResponse(res, 404, 'Карточка не найдена');
      } else {
        res.json({ message: 'Карточка успешно удалена' });
      }
    })
    .catch(error => {
      sendErrorResponse(res, 500, 'Ошибка при удалении карточки');
    });
};

module.exports.addLike = (req, res) => {
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => {
      if (!card) {
        return res.status(404).json({ error: 'Карточка не найдена' });
      }
      res.json(card);
    })
    .catch(error => {
      res.status(500).json({ error: 'Ошибка при постановке лайка карточке' });
    });
};

module.exports.removeLike = (req, res) => {
  const cardId = req.params.cardId;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => {
      if (!card) {
        return res.status(404).json({ error: 'Карточка не найдена' });
      }
      res.json(card);
    })
    .catch(error => {
      res.status(500).json({ error: 'Ошибка при удалении лайка с карточки' });
    });
};

