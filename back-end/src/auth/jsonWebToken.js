const jwt = require('jsonwebtoken');
const fs = require('fs');
const mapError = require('../utils/mapError');

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
    return { type: mapError.UNAUTHORIZED, message: 'Expired or invalid token' };
  }
};

module.exports = {
  createToken,
  verifyToken,
};