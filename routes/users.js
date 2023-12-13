const express = require('express');

const router = express.Router();
const {
  getCurrentUser, getAllUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.get('/me', auth, getCurrentUser);

module.exports = router;
