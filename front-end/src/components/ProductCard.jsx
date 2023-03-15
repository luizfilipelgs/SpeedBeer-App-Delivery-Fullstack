import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import { formattedNumber } from '../utils/ValidationUtils';
import {
  CUSTOMER_PRODUCTS,
  CARD_PRICE,
  IMAGE,
  TITLE,
  RM,
  CARD_QUANTITY,
  ADD,
} from '../utils/Types';

function ProductCard({ product, sumTotalPrice }) {
  const [count, setCount] = useState(0);
  const quantity = 'quantity';
  const totalPrice = 'totalPrice';

  product[quantity] = 0;
  product[totalPrice] = 0;

  const addStorageProduct = () => {
    const storage = getLocalStorage('products');
    product[totalPrice] = product.price * product[quantity];

    if (storage?.length < 0) {
      setLocalStorage('products', [{ ...product }]);
    }
    const repeat = storage.filter((s) => s.id === product.id);

    if (repeat.length > 0) {
      const noRepeat = storage.filter((s) => s.id !== product.id);
      noRepeat.push({ ...product });
      setLocalStorage('products', noRepeat);
    } else {
      storage.push({ ...product });
      setLocalStorage('products', storage);
    }
  };

  const removeProductToStorage = () => {
    const storage = getLocalStorage('products');
    const newStorage = storage.filter((s) => s.id !== product.id);

    setLocalStorage('products', newStorage);
  };

  const handleQuantity = ({ target: { value } }) => {
    if (value <= 0) {
      product[quantity] = Number(0);
      setCount(0);
      removeProductToStorage();
      sumTotalPrice();
    } else {
      product[quantity] = Number(value);
      addStorageProduct();
      sumTotalPrice();
      setCount(value);
    }
  };

  const sumQuantity = () => {
    const sum = count + 1;
    product[quantity] = sum;
    addStorageProduct();
    sumTotalPrice();
    setCount(sum);
  };

  const subQuantity = () => {
    const sub = count - 1;
    if (sub <= 0) {
      product[quantity] = 0;
      removeProductToStorage();
      sumTotalPrice();
      setCount(0);
    } else {
      product[quantity] = sub;
      addStorageProduct();
      sumTotalPrice();
      setCount(sub);
    }
  };

  return (
    <div className="product-card-container">
      <div className="product-card-img-container">
        <img
          src={ product.urlImage }
          alt={ product.name }
          data-testid={ `${CUSTOMER_PRODUCTS}__${IMAGE}-${product.id}` }
        />
      </div>

      <div className="product-name-container">
        <p
          data-testid={ `${CUSTOMER_PRODUCTS}__${TITLE}-${product.id}` }
          className="product-name-text"
        >
          {product.name}
        </p>

        <span
          data-testid={ `${CUSTOMER_PRODUCTS}__${CARD_PRICE}-${product.id}` }
          className="product-price-text"
        >
          {`R$ ${formattedNumber(product.price)}`}
        </span>

        <div className="btns-container">
          <button
            className="increment-button"
            type="button"
            data-testid={ `${CUSTOMER_PRODUCTS}__${RM}-${product.id}` }
            onClick={ subQuantity }
          >
            <IoMdRemoveCircle />
          </button>
          <input
            className="increment-button-number no-spinners text-align"
            type="number"
            value={ count }
            data-testid={ `${CUSTOMER_PRODUCTS}__${CARD_QUANTITY}-${product.id}` }
            onChange={ handleQuantity }
          />
          <button
            className="increment-button"
            type="button"
            data-testid={ `${CUSTOMER_PRODUCTS}__${ADD}-${product.id}` }
            onClick={ sumQuantity }
          >
            <IoMdAddCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
  sumTotalPrice: PropTypes.func.isRequired,
};

export default ProductCard;
