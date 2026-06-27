const rateLimit = require("express-rate-limit");

const bookingLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    message: "Too many booking attempts. Please try again after one minute."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = bookingLimiter;