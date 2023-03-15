const sellers = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller'
  }
];

const saleDetails = {
  id: 1,
  seller: { id: 1, name: 'John Doe' },
  products: [
    { id: 1, name: 'Product 1', quantity: 2 },
    { id: 2, name: 'Product 2', quantity: 3 }
  ]
};

const WithoutTotalPrice = {
  userId: 1,
  sellerId: 2,
  deliveryAddress: 'Rua A, 123',
  deliveryNumber: 123,
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
};

const WithoutNumber = {
  userId: 1,
  sellerId: 2,
  deliveryAddress: 'Rua A, 123',
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
  totalPrice: 50.0,
};

const WithoutUserIdAdress = {
  userId: 1,
  sellerId: 2,
  deliveryNumber: 123,
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
  totalPrice: 50.0,
};

const WithoutUserIdSeller = {
  userId: 1,
  deliveryAddress: 'Rua A, 123',
  deliveryNumber: 123,
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
  totalPrice: 50.0,
};

const WithoutUserId = {
  sellerId: 2,
  deliveryAddress: 'Rua A, 123',
  deliveryNumber: 123,
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
  totalPrice: 50.0,
};

const newSale = {
  userId: 1,
  sellerId: 2,
  deliveryAddress: 'Rua A, 123',
  deliveryNumber: 123,
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
  totalPrice: 50.0,
};

module.exports = {
  sellers,
  saleDetails,
  newSale,
  WithoutUserId,
  WithoutUserIdSeller,
  WithoutUserIdAdress,
  WithoutNumber,
  WithoutTotalPrice,
};