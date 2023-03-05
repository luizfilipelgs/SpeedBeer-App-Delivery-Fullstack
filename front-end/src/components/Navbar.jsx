import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getLocalStorage, delLocalStorage } from '../services/localStorage';
import '../App.css';

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
    <nav
      style={ {
        borderBottom: '1px solid black',
        paddingBottom: '18.5px',
        marginBottom: '24px',
      } }
    >
      <ul
        style={ {
          display: 'flex',
          listStyle: 'none',
        } }
      >
        <div
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
              data-testid={ `${ROUTE}__${PRODUCTS}` }
              style={ {
                display: 'flex',
                padding: '16px',
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
              to="/customer/orders"
              activeclassname="active"
              className="nav-link"
              data-testid={ `${ROUTE}__${ORDERS}` }
              style={ {
                display: 'flex',
                padding: '16px',
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
            data-testid={ `${ROUTE}__${FULL_NAME}` }
            style={ {
              display: 'flex',
              padding: '16px',
              justifyContent: 'center',
              minWidth: '150px',
              textDecoration: 'none',
              color: '#000',
            } }
          >
            {user.name}
          </li>
          <li>
            <button
              type="button"
              data-testid={ `${ROUTE}__${LOGOUT}` }
              onClick={ handleLogout }
              style={ {
                display: 'flex',
                margin: '0 24px',
                padding: '8px',
                cursor: 'pointer',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '100px',
                textDecoration: 'none',
                color: '#000',
              } }
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
