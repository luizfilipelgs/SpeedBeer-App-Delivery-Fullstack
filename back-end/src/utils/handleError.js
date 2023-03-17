const errorSequelize = require('./errorSequelize');

let listErrors = [];
let typeError = false;
let finalMessage = '';

const manyErrors = (errors) => {
  for (let index = 0; index < errors.length; index += 1) {
    const error = errors[index];
    const result = errorSequelize(error);
    if (typeError === false) typeError = result.type; 
    listErrors.push(result.message);
  }
  const [erro] = listErrors;
  finalMessage = erro;
  return { type: typeError, message: finalMessage };
};

const processError = (ERRO) => {
  listErrors = [];
  typeError = false;
  finalMessage = '';
  const { errors } = ERRO;
  if (errors) {
    return manyErrors(errors);    
  }
  return { type: 500, message: ERRO.message };
};

module.exports = {
  processError,
};
