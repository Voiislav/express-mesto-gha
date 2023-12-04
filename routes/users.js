const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateProfile, updateAvatar } = require('../controllers/users.js');

router.get('/', getAllUsers);
router.get('/users/:userId', getUserById);
router.post('/', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
