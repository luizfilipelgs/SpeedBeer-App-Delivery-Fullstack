const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
  }

  const isValidEmail = /\S+@\S+\.\S+/.test(email)

  if (!isValidEmail || password.length < 6) {
    return res.status(401).json({ message: 'Formato de Email ou senha Invalidos' });
  }

  next();
};

module.exports = {validateLogin};