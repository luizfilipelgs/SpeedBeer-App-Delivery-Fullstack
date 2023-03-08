import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
import { isRegisterFormValidByAdm } from '../utils/ValidationUtils';
import {
  ERROR_REGISTER,
  INPUT_EMAIL_ADMIN,
  INPUT_NAME_ADMIN,
  INPUT_PASSWORD_ADMIN,
  ROUTE_ADMIN_MANAGE,
  SELECT_ROLE_ADMIN,
  STATUS_CODE_CONFLICT,
} from '../utils/Types';

function FormRegister() {
  const { setUser } = useContext(LoginContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [registerError, setRegisterError] = useState('');

  const roles = ['Customer', 'Seller', 'Administrator'];

  const navigate = useNavigate();

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleRoleChange = ({ target: { value } }) => {
    setSelectedRole(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/register',
        { name, email, password, selectedRole },
        { headers: { 'Content-Type': 'application/json' } },
      );
      const { data } = response;
      if (data.role) {
        setUser(data);
        // navigate(`/${routesLogin[data.role]}`);
        navigate('/customer/products');
      } else {
        setRegisterError(data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === STATUS_CODE_CONFLICT) {
        setRegisterError('Já existe um usuário com este e-mail cadastrado');
      } else {
        setRegisterError('Ocorreu um erro ao tentar fazer registro');
      }
    }
  };

  return (
    <fieldset className="registro">
      <h2>Cadastrar novo usuário</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="nameInput">
          Nome:
          <input
            type="text"
            name="nameInput"
            value={ name }
            placeholder="Digite o seu nome"
            data-testid={ `${ROUTE_ADMIN_MANAGE}__${INPUT_NAME_ADMIN}` }
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
            data-testid={ `${ROUTE_ADMIN_MANAGE}__${INPUT_EMAIL_ADMIN}` }
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
            data-testid={ `${ROUTE_ADMIN_MANAGE}__${INPUT_PASSWORD_ADMIN}` }
            onChange={ handlePasswordChange }
            required
          />
        </label>

        <label htmlFor="roleInput">
          Tipo:
          <select
            name="RoleInput"
            value={ selectedRole }
            data-testid={ `${ROUTE_ADMIN_MANAGE}__${SELECT_ROLE_ADMIN}` }
            onChange={ handleRoleChange }
            required
          >
            <option value="" disabled>
              -- Selecione o tipo --
            </option>
            {roles.map((role) => (
              <option key={ role } value={ role.toLowerCase() }>
                {role}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={
            !isRegisterFormValidByAdm(name, email, password, selectedRole)
          }
        >
          CADASTRAR
        </button>
      </form>
      {registerError && (
        <p
          className=""
          data-testid={ `${ROUTE_ADMIN_MANAGE}__${ERROR_REGISTER}` }
        >
          {registerError}
        </p>
      )}
    </fieldset>
  );
}

export default FormRegister;
