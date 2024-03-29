import React, { useEffect, useState, useContext } from 'react';
import '../css/pages/product.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginContext from '../context/LoginContext';
import NavBar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import { formattedNumber } from '../utils/ValidationUtils';
import { CUSTOMER_PRODUCTS, CHECKOUT_PRICE } from '../utils/Types';

function Products() {
  const { setPrice } = useContext(LoginContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      const { data } = response;
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
    const total = storage?.reduce(
      (acc, curr) => (curr.totalPrice ? curr.totalPrice + acc : curr.price + acc),
      0,
    );
    setTotalPrice(total);
    setPrice(total);
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
      <section className="products-section-container">
        {products.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
            sumTotalPrice={ sumTotalPrice }
          />
        ))}
      </section>

      <button
        className="ver-carrinho"
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ handleClick }
        disabled={ totalPrice === 0 || totalPrice === undefined }
      >
        <span>
          Ver Carrinho
          <br />
          <span data-testid={ `${CUSTOMER_PRODUCTS}__${CHECKOUT_PRICE}` }>
            {`Total: R$ ${totalPrice ? formattedNumber(totalPrice) : '0,00'}`}
          </span>
        </span>
      </button>
    </div>
  );
}

export default Products;
