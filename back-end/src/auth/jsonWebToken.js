const jwt = require('jsonwebtoken');
const fs = require('fs');
const statusCode = require('../utils/statusCode');

const secret = fs.readFileSync('./jwt.evaluation.key');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (data) => {
  const token = jwt.sign({ ...data }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return { message: payload };
  } catch (e) {
    return { type: statusCode.UNAUTHORIZED, message: 'Expired or invalid token' };
  }
};

module.exports = {
  createToken,
  verifyToken,
};