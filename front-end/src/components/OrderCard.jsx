import PropTypes from 'prop-types';
import formatPrice from '../utils/formatPrice';

const ROUTE_ORDERS = 'customer_orders';
const ORDER_ID = 'element-order-id';
const ORDER_DATE = 'element-order-date';
const ORDER_STATUS = 'element-order-delivery-status';
const ORDER_CARD_PRICE = 'element-order-card-price';

function OrderCard({ id, status, date }) {
  const formattedDate = new Date(Date.parse(date)).toLocaleDateString('pt-BR');
  const formattedPrice = formatPrice(totalPrice);

  return (
    <div
      style={ {
        display: 'flex',
        border: '1.5px solid black',
        width: '30%',
        margin: 20,
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignContent: 'space-between',

        alignItems: 'stretch',
      } }
    >
      <div
        className="id-content"
        style={ {
          display: 'flex',
          border: '1.2px solid black',
          margin: 5,
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'column',
        } }
      >
        <h3>Pedido</h3>
        <p data-testid={ `${ROUTE_ORDERS}__${ORDER_ID}${id}` }>{id}</p>
      </div>

      <h3
        className="status-content"
        style={ {
          display: 'flex',
          border: '1.1px solid black',
          margin: 5,
          alignContent: 'center',

        } }
        data-testid={ `${ROUTE_ORDERS}__${ORDER_STATUS}-${id}` }
      >
        {status}
      </h3>

      <div
        className="info-content"
        style={ {
          display: 'flex',
          border: '1.1px solid black',
          margin: 5,
          textAlign: 'center',
          flexDirection: 'column',

        } }
      >
        <h4
          className="date-content"
          data-testid={ `${ROUTE_ORDERS}__${ORDER_DATE}-${id}` }
        >
          {formattedDate}
        </h4>
        <h4
          className="date-content"
          data-testid={ `${ROUTE_ORDERS}__${ORDER_CARD_PRICE}-${id}` }
        >
          {formattedPrice}
        </h4>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  date: PropTypes.string,
  totalPrice: PropTypes.number,
}.isRequired;

export default OrderCard;
