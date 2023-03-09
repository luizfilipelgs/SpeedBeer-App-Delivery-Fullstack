import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isRegisterFormValidByAdm } from '../utils/ValidationUtils';
import {
  ERROR_REGISTER,
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
  const [selectedRole, setSelectedRole] = useState('');

  const roles = ['Customer', 'Seller', 'Administrator'];
  // const { pathname } = useLocation();
  // const navigate = useNavigate();

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

  return (
    <fieldset
      className="form-address-container"
      style={ {
        margin: '0 auto',
        maxWidth: '80%',
        display: 'flex',
        justifyContent: 'space-around',
      } }
    >
      <h2>Cadastrar novo usuário</h2>
      <form
        onSubmit={ handleSubmit }
        style={ {
          margin: '0 auto',
        } }
      >
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
          data-testid={ `${ROUTE_ADMIN_MANAGE}__${REGISTER_ADMIN}` }
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

FormRegister.propTypes = {
  handleSubmit: PropTypes.function,
}.isRequired;

export default FormRegister;
