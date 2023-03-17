const statusCode = require('./statusCode');

const errorSequelize = (error) => {
  const { type, path, value } = error;
  const types = {
    'notNull Violation': { type: statusCode.BAD_REQUEST,
      message: `o campo ${path} é necessário, o valor recebido desse campo foi ${value}` },
    'unique violation': { type: statusCode.CONFLICT, message: 'Email ja está cadastrado' },
  };
  return types[type];
};

module.exports = errorSequelize;
