const express = require('express');

const { celebrate, Joi, Segments } = require('celebrate');

const router = express.Router();
const {
  getCurrentUser, getAllUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

const updateProfileSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const updateAvatarSchema = {
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
};

const getUserByIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
};

router.get('/', getAllUsers);
router.get('/:userId', celebrate(getUserByIdSchema), getUserById);
router.patch('/me', celebrate(updateProfileSchema), updateProfile);
router.patch('/me/avatar', celebrate(updateAvatarSchema), updateAvatar);
router.get('/me', auth, getCurrentUser);

module.exports = router;
