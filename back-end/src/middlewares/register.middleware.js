const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name, !email || !password) {
    return res
      .status(400)
      .json({ message: 'Todos os campos devem ser preenchidos' });
  }

  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  console.log(name.length < 12, name);

  if (name.length < 12 || !isValidEmail || password.length < 6) {
    return res
      .status(401)
      .json({ message: 'Formato de Email ou senha Invalidos' });
  }

  next();
};

module.exports = { validateRegister };