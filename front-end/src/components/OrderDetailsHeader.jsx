import React from 'react';
import { PropTypes } from 'prop-types';
import { useLocation } from 'react-router-dom';
import { formatTextClassName } from '../utils/ValidationUtils';
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
  updateStatus,
  status,
}) {
  const formattedNum = id ? id.toString().padStart(QUATRO, 0) : '';
  const formattedDate = new Date(Date.parse(saleDate)).toLocaleDateString(
    'pt-BR',
  );
  const { pathname } = useLocation();
  const role = pathname.includes('customer') ? 'customer' : 'seller';

  const handleClick = async (click) => {
    try {
      await updateStatus(click);
    } catch (error) {
      console.error(error);
    }
  };

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
        className={ `order-details-status  ${formatTextClassName(status)}` }
        data-testid={ `${role}_order_details__${ORDER_DETAILS_STATUS}` }
      >
        {status || saleStatus}
      </span>

      { role === 'seller' ? (
        <div
          style={ {
            display: 'flex',
            width: '360px',
            justifyContent: 'space-between',
          } }
        >
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
