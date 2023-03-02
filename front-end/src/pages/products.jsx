import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import ProductCard from '../components/productCard';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';

const ROUTE = 'customer_products';
const CART = 'button-cart';
const PRICE = 'checkout-bottom-value';

function Products() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'GET',
      });
      const data = await response.json();
      if (data) {
        setProducts(data);
      } else {
        console.log('Ocorreu um erro');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sumTotalPrice = () => {
    const storage = getLocalStorage('products');
    if (!storage) {
      setLocalStorage('products', []);
    } else {
      setLocalStorage('products', storage);
    }
    const total = storage?.reduce((acc, curr) => (
      curr.totalPrice ? curr.totalPrice + acc : curr.price + acc
    ), 0);
    setTotalPrice(total);
  };

  const quantSave = (id) => {
    const storage = getLocalStorage('products');
    const prod = storage.filter((s) => s.id === id);
    return prod.quantity;
  };

  useEffect(() => {
    sumTotalPrice();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (totalPrice < 0 || undefined) setTotalPrice(0);
  }, [totalPrice]);

  const handleClick = () => {
    navigate('/customer/checkout');
  };

  return (
    <div>
      <NavBar />
      <section>
        { products.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
            sumTotalPrice={ sumTotalPrice }
            quantSave={ quantSave }
          />
        )) }
      </section>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ handleClick }
        disabled={ totalPrice === 0 || totalPrice === undefined }
      >
        Ver Carrinho:
        <span data-testid={ `${ROUTE}__${PRICE}` }>
          {`${totalPrice?.toFixed(2).replace('.', ',')}`}
        </span>
      </button>
    </div>
  );
}

export default Products;
