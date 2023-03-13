import React, { useContext, useState } from 'react';
import '../css/pages/register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContext from '../context/LoginContext';
import { setLocalStorage } from '../services/localStorage';
import { isRegisterFormValid } from '../utils/ValidationUtils';
import {
  ROUTE_REGISTER,
  EMAIL,
  PASSWORD,
  INPUT_NAME,
  REGISTER,
  ERROR_REGISTER,
} from '../utils/Types';

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
      const response = await axios.post(
        'http://localhost:3001/register',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } },
      );
      const { data } = response;
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

  return (
    <div className="registro-container">

      <fieldset className="registro">
        <h2>
          Cadastro
        </h2>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="nameInput">
            Nome:
            <input
              type="text"
              name="nameInput"
              value={ name }
              placeholder="Digite o seu nome"
              data-testid={ `${ROUTE_REGISTER}__${INPUT_NAME}` }
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
              placeholder="Digite seu endereço de e-mail"
              data-testid={ `${ROUTE_REGISTER}__${EMAIL}` }
              onChange={ handleEmailChange }
              required
            />
          </label>
          <label htmlFor="passwordInput">
            Senha:
            <input
              type="password"
              name="passwordInput"
              value={ password }
              placeholder="Digite sua senha"
              data-testid={ `${ROUTE_REGISTER}__${PASSWORD}` }
              onChange={ handlePasswordChange }
              required
            />
          </label>
          <button
            type="submit"
            data-testid={ `${ROUTE_REGISTER}__${REGISTER}` }
            disabled={ !isRegisterFormValid(name, email, password) }
          >
            CADASTRAR
          </button>
        </form>
        {registerError && (
          <p data-testid={ `${ROUTE_REGISTER}__${ERROR_REGISTER}` }>
            {registerError}
          </p>
        )}
      </fieldset>
    </div>
  );
}

export default Register;
