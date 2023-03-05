import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import OrderDetailsHeader from '../components/OrderDetailsHeader';
import TableOrder from '../components/TableOrder';
import { getLocalStorage } from '../services/localStorage';

function CustomerOrder() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('Pendente');
  const [products, setProducts] = useState([]);

  const location = useLocation();

  const getStorage = () => {
    const storage = getLocalStorage('products');
    setProducts(storage);
  };

  useEffect(() => {
    getStorage();
  }, []);

  useEffect(() => {
    try {
      const saleId = location.pathname.split('/')[3];

      axios
        .get(`http://localhost:3001/sales/orders/details/${saleId}`)
        .then((response) => {
          setData(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [location.pathname]);

  const updateStatus = () => {
    const newStatus = status === 'Pendente' ? 'Entregue' : 'Pendente';
    const saleId = location.pathname.split('/')[3];

    axios
      .put(`http://localhost:3001/sales/status/${saleId}`, { newStatus })
      .then(() => {
        setStatus(newStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <NavBar />

      <h3>Detalhe do Pedido</h3>
      <section>
        <OrderDetailsHeader
          id={ data.id }
          sellerName={ data.seller?.name }
          saleDate={ new Date(Date.parse(data.saleDate)) }
          saleStatus={ data.status }
          newStatus={ updateStatus }
        />
      </section>
      <TableOrder products={ products } />
    </div>
  );
}

export default CustomerOrder;
