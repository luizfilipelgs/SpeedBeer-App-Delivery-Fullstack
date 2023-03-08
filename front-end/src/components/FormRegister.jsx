import React, { useState } from 'react';

function FormRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

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
    <div className="">
      <fieldset className="registro">
        <h2>Cadastrar novo usuário</h2>
        <form>
          <label htmlFor="nameInput">
            Nome:
            <input
              type="text"
              name="nameInput"
              value={ name }
              placeholder="Digite o seu nome"
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
              onChange={ handlePasswordChange }
              required
            />
          </label>

          <label htmlFor="roleInput">
            Senha:
            <input
              type="text"
              name="roleInput"
              value={ role }
              placeholder="Digite sua senha"
              onChange={ handleRoleChange }
              required
            />
          </label>

          <button type="submit">CADASTRAR</button>
        </form>

        <p />
      </fieldset>
    </div>
  );
}

export default FormRegister;
