const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');

router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);

module.exports = router;
