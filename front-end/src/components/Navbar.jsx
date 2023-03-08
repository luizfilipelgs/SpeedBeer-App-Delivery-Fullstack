import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getLocalStorage, delLocalStorage } from '../services/localStorage';
import {
  CUSTOMER_PRODUCTS,
  PRODUCTS_LINK,
  ORDERS_LINK,
  FULL_NAME,
  LOGOUT,
} from '../utils/Types';
import { verifyRouteNav } from '../utils/verifyRoute';

function NavBar() {
  const user = getLocalStorage('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    delLocalStorage('user');
    delLocalStorage('products');
    navigate('/login');
  };

  return (
    <nav className="navbar-container">
      <ul>
        {user.role === 'customer' && (
          <div className="navbar-user-container">
            <li>
              <NavLink
                to="/customer/products"
                activeclassname="active"
                className="nav-link "
                data-testid={ `${CUSTOMER_PRODUCTS}__${PRODUCTS_LINK}` }
              >
                Produtos
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ verifyRouteNav(user.role) }
                activeclassname="active"
                className="nav-link"
                data-testid={ `${CUSTOMER_PRODUCTS}__${ORDERS_LINK}` }
              >
                Meus Pedidos
              </NavLink>
            </li>
          </div>
        )}
        {user.role === 'seller' && (
          <li className="navbar-seller-container">
            <NavLink
              to={ verifyRouteNav(user.role) }
              activeclassname="active"
              className="nav-link"
              data-testid={ `${CUSTOMER_PRODUCTS}__${ORDERS_LINK}` }
            >
              Pedidos
            </NavLink>
          </li>
        )}

        <div className="navbar-info-container">
          <li
            data-testid={ `${CUSTOMER_PRODUCTS}__${FULL_NAME}` }
            className="navbar-name-li"
          >
            {user.name}
          </li>
          <li>
            <button
              className="logout-btn"
              type="button"
              data-testid={ `${CUSTOMER_PRODUCTS}__${LOGOUT}` }
              onClick={ handleLogout }
            >
              Sair
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
