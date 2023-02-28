import React from 'react';

const ROUTE = 'common_login';
const EMAIL = 'input-email';
const PASSWORD = 'input-password';
const NAME = 'input-name';
const REGISTER = 'button-register';
const ERROR = 'element-invalid-register';

function Register() {
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
              // value={ name }
              placeholder="Seu nome"
              data-testid={ `${ROUTE}__${NAME}` }
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
              required
            />
          </label>
          <button
            type="submit"
            data-testid={ `${ROUTE}__${REGISTER}` }
          >
            LOGIN
          </button>
        </form>
        <p data-testid={ `${ROUTE}__${ERROR}` }>{loginError}</p>
      </fieldset>
    </div>
  );
}

export default Register;
