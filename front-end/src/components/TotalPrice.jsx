import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { verifyRouteInTotalPrice } from '../utils/verifyRoute';
import formattedNumber from '../utils/formattedNumber';

function TotalPrice({ products }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const total = products.reduce(
      (acc, curr) => (curr.totalPrice ? curr.totalPrice + acc : curr.price + acc),
      0,
    );
    setTotalPrice(total.toFixed(2));
  }, [products]);

  return (
    <span>
      <span>Total: R$ </span>
      <span data-testid={ verifyRouteInTotalPrice(pathname) }>
        {formattedNumber(totalPrice)}
      </span>
    </span>
  );
}

TotalPrice.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      totalPrice: PropTypes.number,
    }),
  ).isRequired,
};

export default TotalPrice;
