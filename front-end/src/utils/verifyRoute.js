export function verifyRoute(pathname) {
  const routes = {
    '/customer/checkout': 'customer_checkout',
    '/customer/orders': 'customer_order_details',
    '/customer/orders/:id': 'customer_orders',
  };

  return routes[pathname] || '';
}

export function verifyRouteInTotalPrice(pathname) {
  const PATH_CHECKOUT = '/customer/checkout';
  const PATH_ORDER_DETAIL = '/customer/orders/';

  if (pathname === PATH_CHECKOUT) {
    return 'customer_checkout__element-order-total-price';
  } if (pathname?.startsWith(PATH_ORDER_DETAIL)) {
    return 'customer_order_details__element-order-total-price';
  }

  return '';
}
