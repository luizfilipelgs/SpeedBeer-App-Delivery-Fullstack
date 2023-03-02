import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import { setLocalStorage } from '../services/localStorage';

const ROUTE = 'common_register';
const EMAIL = 'input-email';
const PASSWORD = 'input-password';
const NAME = 'input-name';
const REGISTER = 'button-register';
const ERROR = 'element-invalid_register';

const MIN_NUMERO_PASSWORD = 6;
const MIN_NUMERO_NAME = 12;

const routesLogin = {
  customer: 'customer/products',
  seller: 'seller/orders',
  administrator: 'admin/manage',
};

function Register() {
  const { setUser } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data.role) {
        setUser(data);
        setLocalStorage('user', data);
        navigate(`/${routesLogin[data.role]}`);
      } else {
        setRegisterError(data.message);
      }
    } catch (error) {
      console.error(error);
      setRegisterError('Ocorreu um erro ao tentar fazer registro');
    }
  };

  const isValidEmail = (validEmail) => /\S+@\S+\.\S+/.test(validEmail);

  const isValidPassword = (validPassword) => validPassword.length >= MIN_NUMERO_PASSWORD;

  const isValidName = (validName) => validName.length >= MIN_NUMERO_NAME;

  const isRegisterFormValid = () => {
    const valid = isValidEmail(email) && isValidPassword(password) && isValidName(name);
    console.log(valid);
    return valid;
  };

  return (
    <div>
      Cadastro
      <fieldset>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="nameInput">
            Nome:
            <input
              type="text"
              name="nameInput"
              value={ name }
              placeholder="Seu nome"
              data-testid={ `${ROUTE}__${NAME}` }
              onChange={ handleNameChange }
              required
            />
          </label>
          <label htmlFor="emailInput">
            Email:
            <input
              type="email"
              name="emailInput"
              value={ email }
              placeholder="email@dominio.com"
              data-testid={ `${ROUTE}__${EMAIL}` }
              onChange={ handleEmailChange }
              required
            />
          </label>
          <label htmlFor="passwordInput">
            Password:
            <input
              type="password"
              name="passwordInput"
              value={ password }
              placeholder="******"
              data-testid={ `${ROUTE}__${PASSWORD}` }
              onChange={ handlePasswordChange }
              required
            />
          </label>
          <button
            type="submit"
            data-testid={ `${ROUTE}__${REGISTER}` }
            disabled={ !isRegisterFormValid() }
          >
            CADASTRAR
          </button>
        </form>
        { registerError && <p data-testid={ `${ROUTE}__${ERROR}` }>{registerError}</p> }
      </fieldset>
    </div>
  );
}

export default Register;
