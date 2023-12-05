const express = require('express');

const router = express.Router();
const {
  getAllCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
