const express = require('express');

const router = express.Router();
const {
  getCurrentUser, getAllUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

const {
  updateProfileSchema,
  updateAvatarSchema,
  getUserByIdSchema,
} = require('../middlewares/validation');

router.get('/', getAllUsers);
router.get('/:userId', getUserByIdSchema, getUserById);
router.patch('/me', updateProfileSchema, updateProfile);
router.patch('/me/avatar', updateAvatarSchema, updateAvatar);
router.get('/me', auth, getCurrentUser);

module.exports = router;
