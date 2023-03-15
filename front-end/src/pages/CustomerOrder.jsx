import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import NavBar from '../components/Navbar';
import { getLocalStorage } from '../services/localStorage';

function CustomerOrder() {
  const [orders, setOrders] = useState([]);
  const { role } = getLocalStorage('user');
  const route = role === 'seller' ? 'sales/seller' : 'sales/orders';

  useEffect(() => {
    const userData = getLocalStorage('user');

    if (!userData) {
      console.error('Dados do usuário não encontrados no Local Storage');
    } else {
      const userId = userData.id;
      axios
        .get(`http://localhost:3001/${route}/${userId}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [route]);

  return (
    <div>
      <NavBar />

      <article className="customer-article-container">
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
