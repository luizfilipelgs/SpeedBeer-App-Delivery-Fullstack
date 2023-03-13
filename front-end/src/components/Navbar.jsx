import React, { useContext } from 'react';
import '../css/components/navBar.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { IoCartSharp, IoLogOutOutline } from 'react-icons/io5';
import LoginContext from '../context/LoginContext';
import { getLocalStorage, delLocalStorage } from '../services/localStorage';
import {
  CUSTOMER_PRODUCTS,
  PRODUCTS_LINK,
  ORDERS_LINK,
  FULL_NAME,
  LOGOUT,
} from '../utils/Types';
import { verifyRouteNav } from '../utils/verifyRoute';
import { formattedNumber } from '../utils/ValidationUtils';

function NavBar() {
  const { price } = useContext(LoginContext);
  const user = getLocalStorage('user');
  const products = getLocalStorage('products');
  const navigate = useNavigate();
  console.log(products);

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

        {user.role === 'administrator' && (
          <li className="navbar-seller-container">
            <NavLink
              to={ verifyRouteNav(user.role) }
              activeclassname="active"
              className="nav-link"
              data-testid={ `${CUSTOMER_PRODUCTS}__${ORDERS_LINK}` }
            >
              Gerenciar Usuários
            </NavLink>
          </li>
        )}

        <div className="navbar-info-container">
          {user.role === 'customer' && (
            <li>
              <NavLink
                className="navbar-cart-li"
                to="/customer/checkout"
              >
                { products?.length > 0 && (
                  <span className="navbar-quantity">
                    {products.length}
                  </span>
                ) }
                <IoCartSharp style={ { width: '5vw', height: '4vh' } } />
                <span className="navbar-price">
                  R$
                  {' '}
                  { price ? formattedNumber(price) : formattedNumber(0) }
                </span>
              </NavLink>
            </li>
          )}
          <li
            data-testid={ `${CUSTOMER_PRODUCTS}__${FULL_NAME}` }
            className="navbar-name-li"
          >
            {user.name}
          </li>
          <button
            className="logout-btn"
            type="button"
            data-testid={ `${CUSTOMER_PRODUCTS}__${LOGOUT}` }
            onClick={ handleLogout }
          >
            <span className="logout">
              Sair
            </span>
            <IoLogOutOutline className="logout-icon" />
          </button>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
