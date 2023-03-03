import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatPrice from '../utils/formatPrice';

const ROUTE_ORDERS = 'customer_orders';
const ORDER_ID = 'element-order-id';
const ORDER_DATE = 'element-order-date';
const ORDER_STATUS = 'element-order-delivery-status';
const ORDER_CARD_PRICE = 'element-order-card-price';

function OrderCard({ id, status, date, totalPrice }) {
  const formattedDate = new Date(Date.parse(date)).toLocaleDateString('pt-BR');
  const formattedPrice = formatPrice(totalPrice);

  return (
    <Link to={ `/customer/orders/${id}` } className="OrderContainer">
      <div className="id-content">
        <span
          style={ {
            fontSize: '1.5rem',
          } }
        >
          Pedido
        </span>

        <span
          style={ {
            alignSelf: 'center',
          } }
          data-testid={ `${ROUTE_ORDERS}__${ORDER_ID}${id}` }
        >
          {id}
        </span>
      </div>

      <span
        className="status-content"
        data-testid={ `${ROUTE_ORDERS}__${ORDER_STATUS}-${id}` }
      >
        {status}
      </span>

      <div className="info-content">
        <span data-testid={ `${ROUTE_ORDERS}__${ORDER_DATE}-${id}` }>
          {formattedDate}
        </span>
        <div>
          <span data-testid={ `${ROUTE_ORDERS}__${ORDER_CARD_PRICE}-${id}` }>
            {formattedPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  date: PropTypes.string,
  totalPrice: PropTypes.number,
}.isRequired;

export default OrderCard;
