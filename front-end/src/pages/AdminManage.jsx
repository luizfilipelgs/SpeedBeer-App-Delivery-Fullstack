import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import LoginContext from '../context/LoginContext';
import FormRegister from '../components/FormRegister';
import NavBar from '../components/Navbar';
import { getLocalStorage } from '../services/localStorage';

function AdminManage() {
  const { setUser } = useContext(LoginContext);
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

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Admin Manage</h1>
      <FormRegister />
    </div>
  );
}

export default AdminManage;
