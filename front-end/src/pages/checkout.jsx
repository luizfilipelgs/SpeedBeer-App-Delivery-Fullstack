import React, { useEffect, useState } from 'react';
import FormAddress from '../components/formAdress';
import NavBar from '../components/navbar';
import TableOrder from '../components/tableOrder';
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
        <TableOrder products={ products } setProducts={ setProducts } />
        <FormAddress />
      </section>
    </div>
  );
}

export default Checkout;
