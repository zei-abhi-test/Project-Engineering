
const jwt = require('jsonwebtoken');

// BROKEN PART 1: Hardcoded secret & no expiry
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

const SECRET = process.env.JWT_SECRET;

const signToken = (payload) => {
  // BROKEN PART 1: expiresIn not set
  return jwt.sign(payload, SECRET, {
  expiresIn: "1h",
});
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { signToken, verifyToken, SECRET };
