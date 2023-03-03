import React from 'react';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import OrderCard from '../components/OrderCard';
import NavBar from '../components/navbar';
import ListOrder from '../utils/Mock/ListOrder';

function CustomerOrder() {
  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:3001/sales')
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

      <div>

        { ListOrder.map((order) => (
          <OrderCard
            key={ order.id }
            id={ order.id }
            status={ order.status }
            date={ new Date((order.saleDate)) }
            totalPrice={ order.totalPrice }
          />
        )) }
      </div>
    </div>
  );
}

export default CustomerOrder;
