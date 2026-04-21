const rateLimit = require('express-rate-limit');

function createApiLimiter(windowMs = 60_000, max = 60) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests. Please try again shortly.' },
  });
}

module.exports = {
  createApiLimiter,
};
