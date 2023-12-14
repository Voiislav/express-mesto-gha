const express = require('express');

const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();
const {
  getAllCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

const createCardSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
};

const deleteCardSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const addLikeSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const removeLikeSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

router.get('/', getAllCards);
router.post('/', celebrate(createCardSchema), createCard);
router.delete('/:cardId', celebrate(deleteCardSchema), deleteCard);
router.put('/:cardId/likes', celebrate(addLikeSchema), addLike);
router.delete('/:cardId/likes', celebrate(removeLikeSchema), removeLike);

module.exports = router;
