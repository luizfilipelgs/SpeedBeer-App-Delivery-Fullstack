import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { IoCloseCircleSharp } from 'react-icons/io5';
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

function TableOrderDetails({ products }) {
  const { setPrice } = useContext(totalPriceContext);
  const [listProducts, setListProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { pathname } = useLocation();

  const sumTotalPrice = () => {
    console.log(listProducts);
    const total = listProducts?.reduce(
      (acc, curr) => acc + curr.price * curr.SalesProducts.quantity,
      0,
    );
    setTotalPrice(total);
    setPrice(total);
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
              <th
                data-testid={ `${verifyRoute(pathname)}__${NUMBER}-${i}` }
                scope="row"
              >
                {i + 1}
              </th>
              <td data-testid={ `${verifyRoute(pathname)}__${NAME}-${i}` }>
                {product.name}
              </td>
              <td
                data-testid={ `${verifyRoute(pathname)}__${ORDER_QUANTITY}-${i}` }
              >
                {product.SalesProducts.quantity}
              </td>
              <td data-testid={ `${verifyRoute(pathname)}__${ORDER_PRICE}-${i}` }>
                {formattedNumber(product.price)}
              </td>
              <td data-testid={ `${verifyRoute(pathname)}__${SUB_TOTAL}-${i}` }>
                {formattedNumber(product.price * product.SalesProducts.quantity)}
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
        <span> Total: R$ </span>
        <span data-testid={ verifyRouteInTotalPrice(pathname) }>
          {formattedNumber(totalPrice)}
        </span>
      </div>
    </div>
  );
}

TableOrderDetails.propTypes = {
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

export default TableOrderDetails;
