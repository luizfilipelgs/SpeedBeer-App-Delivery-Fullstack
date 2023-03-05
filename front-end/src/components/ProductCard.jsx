import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    <div
      className="card"
      style={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
      } }
    >
      <div
        style={ {
          display: 'flex',
          justifyContent: 'center',
          minHeight: '10px',
        } }
      >
        <img
          src={ product.urlImage }
          alt={ product.name }
          data-testid={ `${CUSTOMER_PRODUCTS}__${IMAGE}-${product.id}` }
          style={ {
            objectFit: 'cover',
            width: '150px',
            height: '150px',
            marginBottom: '10px',
          } }
        />
      </div>

      <div
        style={ {
          display: 'flex',
          // margin: '4px auto',
          padding: '8px',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'column',
          minWidth: '100%',
        } }
      >
        <p
          data-testid={ `${CUSTOMER_PRODUCTS}__${TITLE}-${product.id}` }
          style={ {
            fontSize: '1.2rem',
            marginBottom: '10px',
          } }
        >
          {product.name}
        </p>

        <span
          data-testid={ `${CUSTOMER_PRODUCTS}__${CARD_PRICE}-${product.id}` }
          style={ {
            fontSize: '1.4rem',
            fontWeight: 'bold',
            marginBottom: '10px',
          } }
        >
          {`R$ ${formattedNumber(product.price)}`}
        </span>

        <div
          style={ {
            display: 'flex',
            padding: '8px',
            width: '30%',
            height: '20px',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'row',
            minWidth: '150px',
          } }
        >
          <button
            className="increment-button"
            type="button"
            data-testid={ `${CUSTOMER_PRODUCTS}__${RM}-${product.id}` }
            onClick={ subQuantity }
          >
            -
          </button>
          <input
            className="increment-button no-spinners"
            type="number"
            value={ count }
            data-testid={ `${CUSTOMER_PRODUCTS}__${CARD_QUANTITY}-${product.id}` }
            onChange={ handleQuantity }
            style={ {
              textAlign: 'center',
            } }
          />
          <button
            className="increment-button"
            type="button"
            data-testid={ `${CUSTOMER_PRODUCTS}__${ADD}-${product.id}` }
            onClick={ sumQuantity }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
  sumTotalPrice: PropTypes.func.isRequired,
};

export default ProductCard;
