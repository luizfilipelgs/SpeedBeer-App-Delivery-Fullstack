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
    <nav
      className=""
      style={ {
        borderBottom: '1px solid black',
        marginBottom: '25px',
        // position: 'fixed',
        // top: 0,
        // left: 0,
        width: '100%',
        height: '50px',
        padding: '8px 0',
        backgroundColor: '#036B52',
      } }
    >
      <ul
        className=""
        style={ {
          display: 'flex',
          listStyle: 'none',
        } }
      >
        <div
          className=""
          style={ {
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'space-around',
            minWidth: '300px',
            position: 'absolute',
            top: 0,
            left: 0,
          } }
        >
          <li>
            <NavLink
              to="/customer/products"
              activeclassname="active"
              className="nav-link"
              data-testid={ `${CUSTOMER_PRODUCTS}__${PRODUCTS_LINK}` }
              style={ {
                display: 'flex',
                padding: '24px 48px',
                justifyContent: 'center',
                minWidth: '150px',
                textDecoration: 'none',
              } }
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
              style={ {
                display: 'flex',
                padding: '24px 48px',
                justifyContent: 'center',
                minWidth: '150px',
                textDecoration: 'none',
              } }
            >
              Pedidos
            </NavLink>
          </li>
        </div>

        <div
          className=""
          style={ {
            display: 'flex',
            textDecoration: 'none',
            justifyContent: 'space-around',
            alignItems: 'center',
            minWidth: '300px',
            position: 'absolute',
            top: 0,
            right: 0,
          } }
        >
          <li
            data-testid={ `${CUSTOMER_PRODUCTS}__${FULL_NAME}` }
            style={ {
              display: 'flex',
              padding: '24px 48px',
              justifyContent: 'center',
              minWidth: '150px',
              textDecoration: 'none',
              color: 'white',
              backgroundColor: '#421981',
            } }
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
