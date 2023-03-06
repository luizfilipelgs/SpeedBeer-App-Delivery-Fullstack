import React from 'react';
import { PropTypes } from 'prop-types';
import {
  ROUTE_DETAILS,
  ORDER_DETAILS_ID,
  ORDER_DETAILS_SELLER_NAME,
  ORDER_DETAILS_DATE,
  ORDER_DETAILS_STATUS,
  ORDER_DETAILS_BUTTON_CHECK,
  QUATRO,
} from '../utils/Types';

function OrderDetailsHeader({
  id,
  sellerName,
  saleDate,
  saleStatus,
  newStatus,
}) {
  const formattedNum = id ? id.toString().padStart(QUATRO, 0) : '';
  const formattedDate = new Date(Date.parse(saleDate)).toLocaleDateString(
    'pt-BR',
  );

  return (
    <div className="order-details-container">

      <span
        className="order-details-order "
        data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_ID}${id}` }
      >
        PEDIDO
        {' '}
        {formattedNum}
        {' '}
      </span>

      <span className="order-details-seller">
        <span className="order-details-seller-p">P. Venda: </span>
        <span data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_SELLER_NAME}` }>
          {sellerName}
        </span>
      </span>

      <span
        className="order-details-date"
        data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_DATE}` }
      >
        {formattedDate}
      </span>

      <span
        className="order-details-status"
        data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_STATUS}` }
      >
        {saleStatus}
      </span>

      <button
        className="btn-order-details"
        onClick={ () => newStatus('Entregue') }
        data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_BUTTON_CHECK}` }
        disabled={ saleStatus !== 'Em Trânsito' }
        type="button"
      >
        MARCAR COMO ENTREGUE
      </button>

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
