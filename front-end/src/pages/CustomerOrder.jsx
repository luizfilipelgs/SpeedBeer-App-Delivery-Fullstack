import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import NavBar from '../components/navbar';

function CustomerOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      console.error('Dados do usuário não encontrados no Local Storage');
    } else {
      const userId = userData.id;
      axios
        .get(`http://localhost:3001/sales/orders/${userId}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div>
      <NavBar />

      <article
        style={ {
          display: 'flex',
          margin: '24px auto',
          justifyContent: 'center',
          padding: '8px',
          flexFlow: 'row wrap',
          minWidth: '448px',
          maxWidth: '1344px',
        } }
      >
        {orders.map((order) => (
          <OrderCard
            key={ order.id }
            id={ order.id }
            status={ order.status }
            date={ new Date(order.saleDate) }
            totalPrice={ order.totalPrice }
          />
        ))}
      </article>
    </div>
  );
}

export default CustomerOrder;
