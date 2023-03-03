import React from 'react';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import OrderCard from '../components/OrderCard';
import NavBar from '../components/navbar';
import ListOrder from '../utils/Mock/ListOrder';

function CustomerOrder() {
  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const id = localStorage.getItem('user'); // obter o ID do LocalStorage
  //   axios.get(`http://localhost:3001/sales/orders/${id}`)
  //     .then((response) => {
  //       setOrders(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div>

      <NavBar />

      <article
        style={ {
          display: 'flex',
          margin: '24px auto',
          padding: '8px',
          flexFlow: 'row wrap',
          justifyContent: 'center',
          minWidth: '448px',
          maxWidth: '1344px',
        } }
      >

        { ListOrder.map((order) => (
          <OrderCard
            key={ order.id }
            id={ order.id }
            status={ order.status }
            date={ new Date((order.saleDate)) }
            totalPrice={ order.totalPrice }
          />
        )) }
      </article>
    </div>
  );
}

export default CustomerOrder;
