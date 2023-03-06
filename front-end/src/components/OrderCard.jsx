import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formattedNumber } from '../utils/ValidationUtils';
import {
  CUSTOMER_ORDERS,
  ORDER_ID,
  ORDER_DATE,
  ORDER_STATUS,
  ORDER_CARD_PRICE,
  QUATRO,
} from '../utils/Types';

function OrderCard({ id, status, date, totalPrice }) {
  const formattedDate = new Date(Date.parse(date)).toLocaleDateString('pt-BR');
  const formattedNum = id.toString().padStart(QUATRO, 0);

  return (
    <section
      style={ {
        display: 'flex',
        border: '1px solid black',
        margin: '8px',
        justifyContent: 'flex-start',
      } }
    >
      <Link
        to={ `/customer/orders/${id}` }
        className="order-container"
        style={ {
          color: '#000',
          display: 'flex',
          justifyContent: 'space-around',
          maxWidth: '40px',
          minHeight: '100px',
          minWidth: '400px',
          padding: '8px',
          textDecoration: 'none',
        } }
      >
        <div
          className="id-content"
          style={ {
            display: 'flex',
            margin: '4px auto',
            padding: '8px',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            minWidth: '100px',
          } }
        >
          <span
            style={ {
              fontSize: '1.5rem',
            } }
          >
            Pedido
          </span>

          <span
            data-testid={ `${CUSTOMER_ORDERS}__${ORDER_ID}-${id}` }
            style={ {
              alignSelf: 'center',
            } }
          >
            {formattedNum}
          </span>
        </div>

        <span
          data-testid={ `${CUSTOMER_ORDERS}__${ORDER_STATUS}-${id}` }
          className="status-content"
          style={ {
            display: 'flex',
            margin: '4px auto',
            padding: '8px',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            minWidth: '100px',
          } }
        >
          {status}
        </span>

        <div
          className="info-content"
          style={ {
            display: 'flex',
            margin: '4px auto',
            padding: '8px',
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '100px',
          } }
        >
          <span data-testid={ `${CUSTOMER_ORDERS}__${ORDER_DATE}-${id}` }>
            {formattedDate}
          </span>

          <div>
            <span>R$: </span>
            <span data-testid={ `${CUSTOMER_ORDERS}__${ORDER_CARD_PRICE}-${id}` }>
              {formattedNumber(totalPrice)}
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  date: PropTypes.string,
  totalPrice: PropTypes.number,
}.isRequired;

export default OrderCard;
