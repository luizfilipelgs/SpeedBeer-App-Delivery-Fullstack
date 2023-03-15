const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json('Todos os campos devem ser preenchidos');
  }

  const isValidEmail = /\S+@\S+\.\S+/.test(email);
  if (!isValidEmail || password.length < 6) {
    return res
      .status(401)
      .json('Formato de Email ou senha Invalidos');
  }
  next();
};

module.exports = { validateLogin };
