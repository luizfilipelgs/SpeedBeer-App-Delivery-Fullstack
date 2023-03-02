import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import NavBar from '../components/navbar';

function CustomerOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/sales')
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <header>
        <p>CustomerOrder</p>
      </header>
      <NavBar />

      <div>
        <h2>Pedidos</h2>
        { orders.map((order) => (
          <OrderCard
            key={ order.id }
            id={ order.id }
            status={ order.status }
            date={ new Date((order.saleDate)) }
            Price={ order.totalPrice }
          />
        )) }
      </div>
    </div>
  );
}

export default CustomerOrder;
