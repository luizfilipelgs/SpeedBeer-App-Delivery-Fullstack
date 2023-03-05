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
    <div>
      <span
        data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_ID}${id}` }
        style={ {
          margin: '4px auto',
          padding: '8px',
        } }
      >
        PEDIDO
        {' '}
        {formattedNum}
        {' '}
      </span>

      <span
        style={ {
          margin: '4px auto',
          padding: '8px',
        } }
      >
        <span>P. Venda: </span>
        <span data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_SELLER_NAME}` }>
          {sellerName}
        </span>
      </span>

      <span
        data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_DATE}` }
        style={ {
          margin: '4px auto',
          padding: '8px',
        } }
      >
        {formattedDate}
      </span>

      <span
        data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_STATUS}` }
        style={ {
          margin: '4px auto',
          padding: '8px',
        } }
      >
        {saleStatus}
      </span>

      <button
        onClick={ () => newStatus('Entregue') }
        data-testid={ `${ROUTE_DETAILS}__${ORDER_DETAILS_BUTTON_CHECK}` }
        disabled={ saleStatus !== 'Em Trânsito' }
        type="button"
        style={ {
          margin: '4px auto',
          padding: '8px',
        } }
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
