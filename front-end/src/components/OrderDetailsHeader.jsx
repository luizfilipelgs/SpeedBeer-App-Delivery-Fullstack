import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';
import {
  ORDER_DETAILS_ID,
  ORDER_DETAILS_SELLER_NAME,
  ORDER_DETAILS_DATE,
  ORDER_DETAILS_STATUS,
  ORDER_DETAILS_BUTTON_CHECK,
  ORDER_DETAILS_BUTTON_PREPARE,
  ORDER_DETAILS_BUTTON_DISPATCH,
  QUATRO,
} from '../utils/Types';

function OrderDetailsHeader({
  id,
  sellerName,
  saleDate,
  saleStatus,
}) {
  const [status, setStatus] = useState('Pendente');
  const formattedNum = id ? id.toString().padStart(QUATRO, 0) : '';
  const formattedDate = new Date(Date.parse(saleDate)).toLocaleDateString(
    'pt-BR',
  );
  const { pathname } = useLocation();
  const role = pathname.includes('customer') ? 'customer' : 'seller';
  const location = useLocation();

  const updateStatus = (newStatus) => {
    const saleId = location.pathname.split('/')[3];

    axios
      .put(`http://localhost:3001/sales/status/${saleId}`, { newStatus })
      .then(() => {
        setStatus(newStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = (click) => {
    console.log(click);
    setStatus(click);
    updateStatus(click);
  };

  useEffect(() => {
    if (saleStatus && saleStatus !== 'Pendente') {
      setStatus(saleStatus);
    }
  }, [saleStatus]);

  return (
    <div className="order-details-container">

      <span
        className="order-details-order "
        data-testid={ `${role}_order_details__${ORDER_DETAILS_ID}${id}` }
      >
        PEDIDO
        {' '}
        {formattedNum}
        {' '}
      </span>

      <span className="order-details-seller">
        <span className="order-details-seller-p">P. Venda: </span>
        <span data-testid={ `${role}_order_details__${ORDER_DETAILS_SELLER_NAME}` }>
          {sellerName}
        </span>
      </span>

      <span
        className="order-details-date"
        data-testid={ `${role}_order_details__${ORDER_DETAILS_DATE}` }
      >
        {formattedDate}
      </span>

      <span
        className="order-details-status"
        data-testid={ `${role}_order_details__${ORDER_DETAILS_STATUS}` }
      >
        {status || saleStatus}
      </span>

      { role === 'seller' ? (
        <div>
          <button
            className="btn-order-details"
            onClick={ () => handleClick('Preparando') }
            data-testid={ `${role}_order_details__${ORDER_DETAILS_BUTTON_PREPARE}` }
            disabled={ status !== 'Pendente' }
            type="button"
          >
            PREPARAR PEDIDO
          </button>

          <button
            className="btn-order-details"
            onClick={ () => handleClick('Em Trânsito') }
            data-testid={ `${role}_order_details__${ORDER_DETAILS_BUTTON_DISPATCH}` }
            disabled={ status !== 'Preparando' }
            type="button"
          >
            SAIU PARA ENTREGA
          </button>
        </div>
      ) : (
        <button
          className="btn-order-details"
          onClick={ () => handleClick('Entregue') }
          data-testid={ `${role}_order_details__${ORDER_DETAILS_BUTTON_CHECK}` }
          disabled={ status !== 'Em Trânsito' }
          type="button"
        >
          MARCAR COMO ENTREGUE
        </button>
      )}

    </div>
  );
}

OrderDetailsHeader.propTypes = {
  id: PropTypes.number,
  sellerName: PropTypes.string,
  saleDate: PropTypes.string,
  saleStatus: PropTypes.string,
  newStatus: PropTypes.function,
}.isRequired;

export default OrderDetailsHeader;
