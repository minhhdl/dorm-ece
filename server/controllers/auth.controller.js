const jwt = require('jsonwebtoken');
const { JWTKEY } = require('../config');

const createToken = async (payload) => await jwt.sign(payload, JWTKEY, {
   expiresIn: '30m',
});

const verifyToken = async (token) => await jwt.verify(token, JWTKEY);

module.exports = {
  createToken,
  verifyToken,
};