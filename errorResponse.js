module.exports.sendErrorResponse = (res, statusCode, message) => res.status(statusCode).json({ message });
