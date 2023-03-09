import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FormRegister from '../components/FormRegister';
import NavBar from '../components/Navbar';
import { getLocalStorage } from '../services/localStorage';
import { STATUS_CODE_CONFLICT } from '../utils/Types';
import UsersTable from '../components/UsersTable';

function AdminManage() {
  const [users, setUsers] = useState([]);
  const [registerError, setRegisterError] = useState('');
  const user = getLocalStorage('user');

  const getAllUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/login/users', {
        headers: {
          Authorization: user.token,
        },
      });

      setUsers(response.data.filter((d) => d.id !== user.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleSubmit = async (e, { name, email, password, role }) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3001/register/admin',
        { name, email, password, role },
        {
          headers: {
            Authorization: user.token,
          },
        },
      );

      await getAllUser();
      setRegisterError('');
    } catch (error) {
      if (error.response && error.response.status === STATUS_CODE_CONFLICT) {
        setRegisterError('Já existe um usuário com este e-mail cadastrado');
      } else {
        setRegisterError('Ocorreu um erro ao tentar fazer registro');
      }
    }
  };

  return (
    <div>
      <NavBar />
      <FormRegister handleSubmit={ handleSubmit } registerError={ registerError } />
      <UsersTable users={ users } />
    </div>
  );
}

export default AdminManage;
