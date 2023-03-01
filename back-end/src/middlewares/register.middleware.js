const validName = (name) => name && name.length >= 12;

const validPass = (password) => password && password.length >= 6;

const validMail = (email) => email && /\S+@\S+\.\S+/.test(email);

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!validName(name) || !validPass(password) || !validMail(email)) {
    return res
      .status(401)
      .json({ message: 'Formato de Email ou senha Invalidos' });
  }

  next();
};

module.exports = { validateRegister };