import React, { useState } from 'react';

function FormRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

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
