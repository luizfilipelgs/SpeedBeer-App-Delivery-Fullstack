import PropTypes from 'prop-types';
import '../css/components/orderCard.css';
import { Link, useLocation } from 'react-router-dom';
import { formattedNumber, formatTextClassName } from '../utils/ValidationUtils';
import {
  ORDER_ID,
  ORDER_DATE,
  ORDER_STATUS,
  ORDER_CARD_PRICE,
  QUATRO,
} from '../utils/Types';
import { verifyRoute, verifyRouteNav } from '../utils/verifyRoute';
import { getLocalStorage } from '../services/localStorage';

function OrderCard({ id, status, date, totalPrice }) {
  const formattedDate = new Date(Date.parse(date)).toLocaleDateString('pt-BR');
  const formattedNum = id.toString().padStart(QUATRO, 0);
  const { pathname } = useLocation();
  const { role } = getLocalStorage('user');

  return (
    <section className="order-card-container">
      <Link to={ `${verifyRouteNav(role)}/${id}` } className="order-container">
        <div className="id-content">
          <span className="id-content-text-medium-size">Pedido</span>

          <span
            data-testid={ `${verifyRoute(pathname)}__${ORDER_ID}-${id}` }
            className="align-self"
          >
            {formattedNum}
          </span>
        </div>

        <span
          data-testid={ `${verifyRoute(pathname)}__${ORDER_STATUS}-${id}` }
          className={ `order-card-status-content status-${formatTextClassName(
            status,
          )} id-content-text-medium-size ` }
        >
          {status}
        </span>

        <div className="info-orders-content">
          <span data-testid={ `${verifyRoute(pathname)}__${ORDER_DATE}-${id}` }>
            {formattedDate}
          </span>

          <div>
            <span>R$: </span>
            <span
              data-testid={ `${verifyRoute(
                pathname,
              )}__${ORDER_CARD_PRICE}-${id}` }
            >
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
