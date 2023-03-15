import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { USER_CUSTOMER, USER_FAILED, USER_IVALID } from './mocks/Login.mocks';
import renderWithRouter from './helpers/renderWithRouter';

describe('Pagina de Produtos', () => {
  const buttonLogoutID = 'customer_products__element-navbar-link-logout';
  const buttonMyOrdersId = 'customer_products__element-navbar-link-orders';
  const buttonProducts = 'customer_products__element-navbar-link-products';
  const priceCardId = 'customer_products__element-card-price-1';
  const cardTitleId = 'customer_products__element-card-title-1';
  const ROUTE_PRODUCTS = '/customer/products';

  /* beforeEach(() => {
    jest.mock('axios', () => Object.assign(jest.fn(), {
      post: jest.fn().mockReturnValue(USER_CUSTOMER),
    }));
  }); */

  it('01 - Deve renderizar a tela de Products com seus componentes', () => {
    renderWithRouter(<App />, { route: '/customer/products' });

    expect(screen.getByTestId(buttonLogoutID)).toBeInTheDocument();
    expect(screen.getByTestId(buttonMyOrdersId)).toBeInTheDocument();
    expect(screen.getByTestId(buttonProducts)).toBeInTheDocument();
    expect(screen.getByTestId(priceCardId)).toBeInTheDocument();
    expect(screen.getByTestId(cardTitleId)).toBeInTheDocument();
    expect(window.location.pathname).toEqual(ROUTE_PRODUCTS);
  });
});
