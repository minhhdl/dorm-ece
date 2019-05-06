const { verifyToken } = require('./controllers/auth.controller');

const verifyJWT_MW = async (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization : req.query.access_token;
  try {
    const decodedToken = await verifyToken(token);
    req.auth = decodedToken;
    next();
  } catch (e) {
    res.json({ status: 401, error: true, message: "Invalid auth token provided." })
  }
}

const requireRoles = roles => async (req, res, next) => {
  const auth = req.auth;
  try {
    if (!auth) return res.json({ status: 401, error: true, message: "Invalid auth token provided." });
    const { user } = auth;
    const isPassed = roles.indexOf(user.role) !== -1;
    if (isPassed) return next();
    return res.json({ status: 401, error: true, message: "Permission denied." });
  } catch (e) {
    res.json({ status: 401, error: true, message: "Invalid auth token provided." })
  }
}

module.exports = {
  verifyJWT_MW,
  requireRoles,
};