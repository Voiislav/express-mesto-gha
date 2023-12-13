const jwt = require('jsonwebtoken');

const { sendErrorResponse } = require('../utils/errorResponse');

const { ERROR_UNAUTHORIZED } = require('../utils/errorCodes');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return sendErrorResponse(res, ERROR_UNAUTHORIZED, 'Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    return sendErrorResponse(res, ERROR_UNAUTHORIZED, 'Необходима авторизация');
  }
  req.user = payload;

  next();
};
