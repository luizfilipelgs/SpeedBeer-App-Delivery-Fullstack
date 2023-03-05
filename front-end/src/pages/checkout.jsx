import React, { useEffect, useState } from 'react';
import FormAddress from '../components/formAddress';
import NavBar from '../components/navbar';
import TableOrder from '../components/tableOrder';
import TotalPrice from '../components/TotalPrice';
import { getLocalStorage } from '../services/localStorage';

function Checkout() {
  const [products, setProducts] = useState([]);

  const getStorage = () => {
    const storage = getLocalStorage('products');
    setProducts(storage);
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <div>
      <NavBar />
      <h4>Finalizar Pedido</h4>
      <section>
        <TableOrder products={ products } />
        <TotalPrice products={ products } />
        <FormAddress products={ products } />
      </section>
    </div>
  );
}

export default Checkout;
