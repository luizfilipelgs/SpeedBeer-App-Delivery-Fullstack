import React, { useContext, useEffect, useState } from 'react';
import '../css/pages/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContext from '../context/LoginContext';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import { isLoginFormValid } from '../utils/ValidationUtils';
import {
  ROUTE_LOGIN,
  EMAIL,
  PASSWORD,
  LOGIN,
  REGISTER,
  ERROR,
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

  return (
    <div className="login-div-container">
      <img src="https://i.pinimg.com/600x315/76/f5/5f/76f55f75b829100bb07ae70f7951d4ca.jpg" alt="sla" />
      <div>
        <fieldset className="login-container">
          <form className="login-form" onSubmit={ handleSubmit }>
            <h1 className="login-header">Login</h1>

            <label className="form-group" htmlFor="emailInput">
              Email:
              <input
                type="email"
                name="emailInput"
                value={ email }
                placeholder="Digite seu endereço de e-mail"
                data-testid={ `${ROUTE_LOGIN}__${EMAIL}` }
                onChange={ handleEmailChange }
                required
              />
            </label>

            <label className="form-group" htmlFor="passwordInput">
              Senha:
              <input
                type="password"
                name="passwordInput"
                value={ password }
                placeholder="Digite sua senha"
                data-testid={ `${ROUTE_LOGIN}__${PASSWORD}` }
                onChange={ handlePasswordChange }
                required
              />
            </label>

            <button
              className="btn-login"
              type="submit"
              data-testid={ `${ROUTE_LOGIN}__${LOGIN}` }
              disabled={ !isLoginFormValid(email, password) }
            >
              LOGIN
            </button>
            <button
              className="btn-signup"
              type="button"
              data-testid={ `${ROUTE_LOGIN}__${REGISTER}` }
              onClick={ () => navigate('/register') }
            >
              Ainda não tenho conta? Cadastre-se
            </button>
          </form>
        </fieldset>
        <div className="login-error">
          {loginError && (
            <p data-testid={ `${ROUTE_LOGIN}__${ERROR}` }>{loginError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
