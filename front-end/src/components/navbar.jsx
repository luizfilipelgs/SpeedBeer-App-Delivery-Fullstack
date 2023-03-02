import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getLocalStorage, delLocalStorage } from '../services/localStorage';

const ROUTE = 'customer_products';
const PRODUCTS = 'element-navbar-link-products';
const ORDERS = 'element-navbar-link-orders';
const FULL_NAME = 'element-navbar-user-full-name';
const LOGOUT = 'element-navbar-link-logout';

function NavBar() {
  const user = getLocalStorage('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    delLocalStorage('user');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            data-testid={ `${ROUTE}__${PRODUCTS}` }
            to="/customer/products"
          >
            Produtos
          </NavLink>
        </li>
        <li>
          <NavLink
            data-testid={ `${ROUTE}__${ORDERS}` }
            to="/customer/orders"
          >
            Pedidos
          </NavLink>
        </li>
        <li
          data-testid={ `${ROUTE}__${FULL_NAME}` }
        >
          { user.name }
        </li>
        <li>
          <button
            type="button"
            data-testid={ `${ROUTE}__${LOGOUT}` }
            onClick={ handleLogout }
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
