import React, { useEffect, useState } from 'react';
import FormAddress from '../components/FormAddress';
import NavBar from '../components/Navbar';
import TableOrder from '../components/TableOrder';
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
      <h3 className="title-page">
        Finalizar Pedido

      </h3>
      <section
        style={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <TableOrder products={ products } />
        <FormAddress products={ products } />
      </section>
    </div>
  );
}

export default Checkout;
