const express = require('express');
const router = express.Router();
const { getAllCards, createCard, deleteCard } = require('../controllers/cards.js');

router.get('/cards', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

module.exports = router;