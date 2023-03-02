const jwt = require('jsonwebtoken');
const fs = require('fs');

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
    return payload;
  } catch (e) {
    return { isError: e };
  }
};

module.exports = {
  createToken,
  verifyToken,
};