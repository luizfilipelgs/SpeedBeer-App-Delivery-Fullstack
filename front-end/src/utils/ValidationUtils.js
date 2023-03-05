import { MIN_NUMBER_PASSWORD } from './Types';

export function formattedNumber(number) {
  const formatted = Number(number).toFixed(2).toString().replace('.', ',');
  return formatted;
}

export const isValidEmail = (validEmail) => /\S+@\S+\.\S+/.test(validEmail);

export const isValidPassword = (password) => password.length >= MIN_NUMBER_PASSWORD;

export const isValidName = (validName) => validName.length >= MIN_NUMBER_NAME;

export const isRegisterFormValid = (name, email, password) => {
  const valid = isValidEmail(email) && isValidPassword(password) && isValidName(name);
  return valid;
};
