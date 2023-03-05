import React from 'react';
import { PropTypes } from 'prop-types';

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
      <span>
        PEDIDO
        {' '}
        {formattedNum}
        {' '}
      </span>

      <span>
        <span>P. Venda: </span>
        <span>{sellerName}</span>
      </span>

      <span>{formattedDate}</span>

      <span>{saleStatus}</span>

      <button onClick={ () => newStatus('Entregue') } type="button">
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
