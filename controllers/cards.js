const Card = require('../models/card.js');

module.exports.getAllCards = (req, res) => {
  Card.find()
  .then(cards => {
    res.json(cards);
  })
  .catch(error => {
    res.status(500).json({ error: 'Ошибка при попытке вернуть данные' });
  });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner, likes, createdAt } = req.body;
  Card.create({ name, link })
    .then(card => {
      res.status(201).send({ data: card })
    })
    .catch(error => {
      res.status(500).send({ error: 'Ошибка при создании пользователя' })
    });
};

module.exports.deleteCard = (req, res) => {
  const cardId = req.params.cardId;
  Card.findByIdAndDelete(cardId)
    .then(card => {
      if (!card) {
        res.status(404).json({ error: 'Карточка не найдена' });
      } else {
        res.json({ message: 'Карточка успешно удалена' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Ошибка при удалении карточки' });
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

