import React, { useContext, useEffect, useState } from 'react';
import '../css/components/tableOrder.css';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import totalPriceContext from '../context/LoginContext';
import { verifyRoute, verifyRouteInTotalPrice } from '../utils/verifyRoute';
import { formattedNumber } from '../utils/ValidationUtils';

import {
  PATH_CHECKOUT,
  PATH_ORDERS_DETAIL,
  NUMBER,
  NAME,
  ORDER_QUANTITY,
  ORDER_PRICE,
  SUB_TOTAL,
  REMOVE,
} from '../utils/Types';

function TableOrder({ products }) {
  const { setPrice } = useContext(totalPriceContext);
  const [listProducts, setListProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { pathname } = useLocation();

  const sumTotalPrice = () => {
    const total = listProducts?.reduce(
      (acc, curr) => (curr.totalPrice ? curr.totalPrice + acc : curr.price + acc),
      0,
    );
    setTotalPrice(total.toFixed(2));
    setPrice(total.toFixed(2));
  };

  const removeProduct = (id) => {
    const storage = getLocalStorage('products');
    const newStorage = storage.filter((s) => s.id !== Number(id));

    setLocalStorage('products', newStorage);
    setListProducts(newStorage);
  };

  useEffect(() => {
    setListProducts(products);
  }, [products]);

  useEffect(() => {
    sumTotalPrice();
  }, [listProducts]);

  const headerTable = () => {
    if (pathname === PATH_CHECKOUT) {
      return [
        'item',
        'Descrição',
        'Quantidade',
        'Valor Unitário',
        'Sub-total',
        'Remover',
      ];
    }
    if (pathname.startsWith(PATH_ORDERS_DETAIL)) {
      return ['item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];
    }
    return [];
  };

  return (
    <div className="table-container">
      <table className="table-wrapper table-scroll">
        <thead>
          <tr>
            {headerTable()?.map((header) => (
              <th key={ header } scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listProducts?.map((product, i) => (
            <tr key={ product.id }>
              <td
                style={ { backgroundColor: '#ffc800' } }
                data-testid={ `${verifyRoute(pathname)}__${NUMBER}-${i}` }
              >
                {i + 1}
              </td>
              <td data-testid={ `${verifyRoute(pathname)}__${NAME}-${i}` }>
                {product.name}
              </td>
              <td
                data-testid={ `${verifyRoute(pathname)}__${ORDER_QUANTITY}-${i}` }
              >
                {product.quantity}
              </td>
              <td data-testid={ `${verifyRoute(pathname)}__${ORDER_PRICE}-${i}` }>
                {formattedNumber(product.price)}
              </td>
              <td data-testid={ `${verifyRoute(pathname)}__${SUB_TOTAL}-${i}` }>
                {formattedNumber(product.totalPrice)}
              </td>
              {pathname === PATH_CHECKOUT && (
                <td>
                  <button
                    className="remove-btn"
                    data-testid={ `${verifyRoute(pathname)}__${REMOVE}-${i}` }
                    id={ product.id }
                    value={ product.id }
                    type="button"
                    onClick={ () => {
                      removeProduct(product.id);
                    } }
                    aria-label="Remover"
                  >
                    <IoCloseCircleSharp />

                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-label">
        <div className="card-price-checkout-form-address">
          <span> Total: R$ </span>
          <span data-testid={ verifyRouteInTotalPrice(pathname) }>
            {formattedNumber(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

TableOrder.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      quantity: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      totalPrice: PropTypes.number,
    }),
  ).isRequired,
};

export default TableOrder;
