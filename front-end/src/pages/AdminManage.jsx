import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LoginContext from '../context/LoginContext';
import FormRegister from '../components/FormRegister';
import NavBar from '../components/Navbar';
import { getLocalStorage } from '../services/localStorage';
import { STATUS_CODE_CONFLICT } from '../utils/Types';

function AdminManage() {
  const { setUser } = useContext(LoginContext);
  const [registerError, setRegisterError] = useState('');

  const user = getLocalStorage('user');

  const getAllUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/login/users');
      const dataFiltered = response.data.filter((d) => d.id !== user.id);

      if (dataFiltered) {
        setUser(dataFiltered);
      } else {
        console.log('Ocorreu um erro');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e, { name, email, password, selectedRole }) => {
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
        getAllUser();
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

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      <NavBar />
      <FormRegister handleSubmit={ handleSubmit } registerError={ registerError } />
    </div>
  );
}

export default AdminManage;
