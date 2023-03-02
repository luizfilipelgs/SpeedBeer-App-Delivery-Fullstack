import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';

const ROUTE = 'customer_products';
const PRICE = 'element-card-price';
const IMAGE = 'img-card-bg-image';
const TITLE = 'element-card-title';
const RM = 'button-card-rm-item';
const QUANTITY = 'input-card-quantity';
const ADD = 'button-card-add-item';

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
    <div>
      <div>
        <span
          data-testid={ `${ROUTE}__${PRICE}-${product.id}` }
        >
          {`R$ ${product.price.replace('.', ',')}`}
        </span>
        <img
          src={ product.urlImage }
          alt={ product.name }
          data-testid={ `${ROUTE}__${IMAGE}-${product.id}` }
        />
      </div>
      <p
        data-testid={ `${ROUTE}__${TITLE}-${product.id}` }
      >
        {product.name}
      </p>
      <div>
        <button
          type="button"
          data-testid={ `${ROUTE}__${RM}-${product.id}` }
          onClick={ subQuantity }
        >
          -
        </button>
        <input
          type="number"
          value={ count }
          data-testid={ `${ROUTE}__${QUANTITY}-${product.id}` }
          onChange={ handleQuantity }
        />
        <button
          type="button"
          data-testid={ `${ROUTE}__${ADD}-${product.id}` }
          onClick={ sumQuantity }
        >
          +
        </button>
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
  quantSave: PropTypes.func.isRequired,
};

export default ProductCard;
