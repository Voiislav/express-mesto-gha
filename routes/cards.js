const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cards.js');

router.get('/cards', cardController.getAllCards);
router.post('/cards', cardController.createCard);
router.delete('/cards/:cardId', cardController.deleteCard);
router.patch('/users/me', userController.updateProfile);
router.patch('/users/me/avatar', userController.updateAvatar);

module.exports = router;