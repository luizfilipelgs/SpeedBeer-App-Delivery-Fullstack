import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

function FormRegister() {
  const { setUser } = useContext(LoginContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [registerError, setRegisterError] = useState('');

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
    setRole(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/register',
        { name, email, password, role },
        { headers: { 'Content-Type': 'application/json' } },
      );
      const { data } = response;
      if (data.role) {
        setUser(data);
        navigate('/customer/products');
      } else {
        setRegisterError(data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setRegisterError('Já existe um usuário com este e-mail cadastrado');
      } else {
        setRegisterError('Ocorreu um erro ao tentar fazer registro');
      }
    }
  };

  return (
    <div className="">
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
            Tipo:
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
        {registerError && <p className="">{registerError}</p>}
      </fieldset>
    </div>
  );
}

export default FormRegister;
