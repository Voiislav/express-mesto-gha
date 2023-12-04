const express = require('express');
const router = express.Router();
const { getAllCards, createCard, deleteCard } = require('../controllers/cards.js');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;