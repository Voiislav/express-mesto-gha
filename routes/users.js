const express = require('express');

const router = express.Router();
const {
  createUser, getAllUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
