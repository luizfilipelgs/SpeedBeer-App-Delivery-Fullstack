import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContext from '../context/LoginContext';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import {
  ROUTE_LOGIN,
  EMAIL,
  PASSWORD,
  LOGIN,
  REGISTER,
  ERROR,
  MIN_NUMBER_PASSWORD,
} from '../utils/Types';

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
    // getLocalStorage('user')
    const user = getLocalStorage('user');
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
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
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

  const isValidPassword = (validPassword) => validPassword.length >= MIN_NUMBER_PASSWORD;

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
            data-testid={ `${ROUTE_LOGIN}__${EMAIL}` }
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
            data-testid={ `${ROUTE_LOGIN}__${PASSWORD}` }
            onChange={ handlePasswordChange }
            required
          />
        </label>
        <button
          type="submit"
          data-testid={ `${ROUTE_LOGIN}__${LOGIN}` }
          disabled={ !isLoginFormValid() }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid={ `${ROUTE_LOGIN}__${REGISTER}` }
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      {loginError && (
        <p data-testid={ `${ROUTE_LOGIN}__${ERROR}` }>{loginError}</p>
      )}
    </fieldset>
  );
}

export default Login;
