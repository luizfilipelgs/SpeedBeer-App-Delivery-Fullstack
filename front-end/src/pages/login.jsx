import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContext from '../context/LoginContext';
import { setLocalStorage } from '../services/localStorage';

const ROUTE = 'common_login';
const EMAIL = 'input-email';
const PASSWORD = 'input-password';
const LOGIN = 'button-login';
const REGISTER = 'button-register';
const ERROR = 'element-invalid-email';

const MIN_NUMERO_PASSWORD = 6;

const routesLogin = {
  customer: 'customer/products',
  seller: 'seller/orders',
  administrator: 'admin/manage',
};

function Login() {
  const { setUser } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      navigate(`/${routesLogin[user.role]}`);
    }
  }, [navigate]);

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const { data } = response;
      if (data.role) {
        setUser(data);
        setLocalStorage('user', data);
        navigate(`/${routesLogin[data.role]}`, { replace: true });
      } else {
        setLoginError('Você não tem uma conta');
      }
    } catch (error) {
      console.error(error);
      setLoginError('Ocorreu um erro ao tentar fazer login');
    }
  };

  const isValidEmail = (validEmail) => /\S+@\S+\.\S+/.test(validEmail);

  const isValidPassword = (validPassword) => validPassword.length >= MIN_NUMERO_PASSWORD;

  const isLoginFormValid = () => isValidEmail(email) && isValidPassword(password);

  return (
    <fieldset>
      <form onSubmit={ handleSubmit }>
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
          data-testid={ `${ROUTE}__${LOGIN}` }
          disabled={ !isLoginFormValid() }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid={ `${ROUTE}__${REGISTER}` }
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      {loginError && <p data-testid={ `${ROUTE}__${ERROR}` }>{loginError}</p>}
    </fieldset>
  );
}

export default Login;
