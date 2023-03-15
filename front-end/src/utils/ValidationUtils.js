import { MIN_NUMBER_PASSWORD, MIN_NUMBER_NAME } from './Types';

export function formattedNumber(number) {
  const formatted = Number(number).toFixed(2).toString().replace('.', ',');
  return formatted;
}

export const isValidEmail = (validEmail) => /\S+@\S+\.\S+/.test(validEmail);

export const isValidPassword = (password) => password.length >= MIN_NUMBER_PASSWORD;

export const isValidName = (validName) => validName.length >= MIN_NUMBER_NAME;

function isValidRole(role) {
  const regex = /^(customer|seller|administrator)$/;
  return regex.test(role);
}

export const isLoginFormValid = (email, password) => {
  const isEmailValid = isValidEmail(email);
  const isPasswordValid = isValidPassword(password);
  return isEmailValid && isPasswordValid;
};

export const isRegisterFormValid = (name, email, password) => {
  const isNameValid = isValidName(name);
  const isEmailValid = isValidEmail(email);
  const isPasswordValid = isValidPassword(password);
  return isNameValid && isEmailValid && isPasswordValid;
};

export const isRegisterFormValidByAdm = (name, email, password, role) => {
  const isNameValid = isValidName(name);
  const isEmailValid = isValidEmail(email);
  const isPasswordValid = isValidPassword(password);
  const isRoleValid = isValidRole(role);
  return isNameValid && isEmailValid && isPasswordValid && isRoleValid;
};

export function isAddressFormValid(selectedSeller, address, number) {
  return (
    selectedSeller !== ''
    && address.trim() !== ''
    && number !== ''
  );
}

export function textoSemAcento(text) {
  return text
    .replace(/[áàãâä]/gi, 'a')
    .replace(/[éèêë]/gi, 'e')
    .replace(/[íìîï]/gi, 'i')
    .replace(/[óòõôö]/gi, 'o')
    .replace(/[úùûü]/gi, 'u')
    .replace(/[ç]/gi, 'c');
}

export function formatText(text) {
  return text
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export function formatTextClassName(text) {
  const semAcento = textoSemAcento(text);
  const formattedText = formatText(semAcento);
  return formattedText;
}
