import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import totalPriceContext from '../context/LoginContext';
import { verifyRoute, verifyRouteInTotalPrice } from '../utils/verifyRoute';
import formattedNumber from '../utils/formattedNumber';

const PATH_CHECKOUT = '/customer/checkout';
const PATH_ORDERS = '/customer/orders';
const NUMBER = 'element-order-table-item-number';
const NAME = 'element-order-table-name';
const QUANTITY = 'element-order-table-quantity';
const PRICE = 'element-order-table-unit-price';
const SUB_TOTAL = 'element-order-table-sub-total';
const REMOVE = 'element-order-table-remove';

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
    <div>
      <table>
        <colgroup>
          <col style={ { width: '10%' } } />
          <col style={ { width: '40%' } } />
          <col style={ { width: '15%' } } />
          <col style={ { width: '15%' } } />
          <col style={ { width: '15%' } } />
          <col style={ { width: '5%' } } />
        </colgroup>
        <thead>
          <tr>
            {headerTable().map((header) => (
              <th key={ header } scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listProducts?.map((product, i) => (
            <tr key={ product.id }>
              <th data-testid={ `${verifyRoute()}__${NUMBER}-${i}` } scope="row">
                {i + 1}
              </th>
              <td data-testid={ `${verifyRoute()}__${NAME}-${i}` }>
                {product.name}
              </td>
              <td data-testid={ `${verifyRoute()}__${QUANTITY}-${i}` }>
                {product.quantity}
              </td>
              <td data-testid={ `${verifyRoute()}__${PRICE}-${i}` }>
                {formattedNumber(product.price)}
              </td>
              <td data-testid={ `${verifyRoute()}__${SUB_TOTAL}-${i}` }>
                {formattedNumber(product.totalPrice)}
              </td>
              {pathname === PATH_CHECKOUT && (
                <td>
                  <button
                    data-testid={ `${verifyRoute()}__${REMOVE}-${i}` }
                    id={ product.id }
                    type="button"
                    onClick={ () => removeProduct(product.id) }
                  >
                    Remover
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Total: R$</h2>
        <h2 data-testid={ verifyRouteInTotalPrice(pathname) }>
          {formattedNumber(totalPrice)}
        </h2>
      </div>
    </div>
  );
}

TableOrder.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TableOrder;
