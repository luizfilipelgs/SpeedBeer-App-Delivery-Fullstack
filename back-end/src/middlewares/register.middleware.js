const validName = (name) => name && name.length >= 12;

const validPass = (password) => password && password.length >= 6;

const validMail = (email) => email && /\S+@\S+\.\S+/.test(email);

function validarRole(role) {
  const regex = /^(customer|seller|administrator)$/;
  return regex.test(role);
}

const validateRegisterByAdm = (req, res, next) => {
  const { name, email, password, role } = req.body;

  const isValidName = validName(name);
  const isValidPassword = validPass(password);
  const isValidEmail = validMail(email);
  const isValidRole = validarRole(role);

  if (!isValidName || !isValidPassword || !isValidEmail || !isValidRole) {
    return res.status(401).json({ message: "Formato dos campos Inválidos" });
  }

  next();
};

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!validName(name) || !validPass(password) || !validMail(email)) {
    return res
      .status(401)
      .json({ message: "Formato de Email ou senha Inválidos" });
  }

  next();
};

module.exports = { validateRegisterByAdm, validateRegister };
