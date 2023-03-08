import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import { getLocalStorage } from '../services/localStorage';

function AdminManage() {
  const [users, setUsers] = useState([]);
  const user = getLocalStorage('user');

  const getAllUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/login/users');

      const dataFiltered = response.data.filter((d) => d.id !== user.id);
      console.log(dataFiltered, 'dataFiltered');
      if (dataFiltered) {
        setUsers(dataFiltered);
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
    </div>
  );
}

export default AdminManage;
