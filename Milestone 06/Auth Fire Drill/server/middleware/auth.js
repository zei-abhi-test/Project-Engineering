
const { verifyToken } = require('../auth/jwt');
const { blacklist } = require('../data/store');

const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if(!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = verifyToken(token.split(' ')[1]);
    const rawToken = token.split(" ")[1];

if (blacklist.includes(rawToken)) {
    return res.status(401).json({
        error: "Token has been invalidated",
    });
}

const decoded = verifyToken(rawToken);

req.user = decoded;
// BROKEN PART 2: req.user.role will be undefined
    
    // BROKEN PART 6: No blacklist check here
    next();
  } catch (err) {
    res.status(401).json({ error: 'Auth failed' });
  }
};

module.exports = auth;
