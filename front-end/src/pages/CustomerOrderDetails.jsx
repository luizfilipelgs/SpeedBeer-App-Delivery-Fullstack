import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import OrderDetailsHeader from '../components/OrderDetailsHeader';
import TableOrderDetails from '../components/TableOrderDetails';

function CustomerOrder() {
  const [data, setData] = useState(null);
  const [info, setInfo] = useState({});
  const [status, setStatus] = useState('Pendente');

  const location = useLocation();

  const updateStatus = async (newStatus) => {
    const saleId = location.pathname.split('/')[3];

    return axios
      .put(`http://localhost:3001/sales/status/${saleId}`, { newStatus })
      .then(() => {
        setStatus(newStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    try {
      const saleId = location.pathname.split('/')[3];
      axios
        .get(`http://localhost:3001/sales/orders/details/${saleId}`)
        .then((response) => {
          setInfo(response.data);
          setData(response.data.products);
          setStatus(response.data.status);
        });
    } catch (error) {
      console.error(error);
    }
  }, [location.pathname]);
  return (
    <div>
      <NavBar />

      <h3 className="title-page">Detalhes do Pedido</h3>
      <section
        style={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '100%',

        } }
      >

        { data && (
          <OrderDetailsHeader
            id={ info.id }
            sellerName={ info.seller?.name }
            saleDate={ new Date(Date.parse(info.saleDate)) }
            updateStatus={ updateStatus }
            status={ status }
          />
        )}

        { data && <TableOrderDetails products={ data } /> }
      </section>
    </div>
  );
}

export default CustomerOrder;
