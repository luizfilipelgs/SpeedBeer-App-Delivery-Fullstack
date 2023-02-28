import React from 'react';

const ROUTE = 'common_login';
const EMAIL = 'input-email';
const PASSWORD = 'input-password';
const LOGIN = 'button-login';
const ERROR = 'element-invalid-email';

function Login() {
  return (
    <fieldset>
      <form>
        <label htmlFor="emailInput">
          Email:
          <input
            type="email"
            name="emailInput"
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
            placeholder="******"
            data-testid={ `${ROUTE}__${PASSWORD}` }
            required
          />
        </label>
        <button
          type="submit"
          data-testid={ `${ROUTE}__${LOGIN}` }
        >
          LOGIN
        </button>
      </form>
      <p data-testid={ `${ROUTE}__${ERROR}` }>Error</p>
    </fieldset>
  );
}

export default Login;
