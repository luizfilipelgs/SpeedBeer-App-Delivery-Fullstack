import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isRegisterFormValidByAdm } from '../utils/ValidationUtils';
import {
  INPUT_EMAIL_ADMIN,
  INPUT_NAME_ADMIN,
  INPUT_PASSWORD_ADMIN,
  REGISTER_ADMIN,
  ROUTE_ADMIN_MANAGE,
  SELECT_ROLE_ADMIN,
} from '../utils/Types';

function FormRegister({ handleSubmit, registerError }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const roles = ['Customer', 'Seller', 'Administrator'];

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
    setRole(value);
  };

  return (
    <fieldset className="form-register-adm-container">
      <h2 className="sub-title-page">Cadastrar novo usuário</h2>
      <form
        className="form-register-adm"
        onSubmit={ (e) => handleSubmit(e, { name, email, password, role }) }
      >
        <label htmlFor="nameInput">
          Nome:
          <input
            className="input-select-form-register"
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
            className="input-select-form-register"
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
            className="input-select-form-register"
            type="password"
            name="passwordInput"
            value={ password }
            placeholder="Digite sua senha"
            data-testid={ `${ROUTE_ADMIN_MANAGE}__${INPUT_PASSWORD_ADMIN}` }
            onChange={ handlePasswordChange }
            required
          />
        </label>

        <label
          htmlFor="roleInput"
        >
          Tipo:
          <select
            className="input-select-form-register"
            name="RoleInput"
            value={ role }
            data-testid={ `${ROUTE_ADMIN_MANAGE}__${SELECT_ROLE_ADMIN}` }
            onChange={ handleRoleChange }
            required
          >
            <option value="" disabled>
              -- Selecione o tipo --
            </option>
            {roles.map((value) => (
              <option key={ value } value={ value.toLowerCase() }>
                {value}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="btn-login"
          data-testid={ `${ROUTE_ADMIN_MANAGE}__${REGISTER_ADMIN}` }
          disabled={ !isRegisterFormValidByAdm(name, email, password, role) }
        >
          CADASTRAR
        </button>
      </form>

      {registerError && (
        <span data-testid="admin_manage__element-invalid-register">
          {registerError}
        </span>
      )}
    </fieldset>
  );
}

FormRegister.propTypes = {
  handleSubmit: PropTypes.function,
}.isRequired;

export default FormRegister;
