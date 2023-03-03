const ListOrder = [
  {
    id: 1,
    userId: 4,
    sellerId: 7,
    totalPrice: '9.70',
    deliveryAddress: 'Rua 123456',
    deliveryNumber: '123',
    saleDate: '2022-12-10T19:14:15.000Z',
    status: 'Em Trânsito',
    seller: {
      name: 'Fulana Pereira',
    },
    saleProducts: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    userId: 5,
    sellerId: 8,
    totalPrice: '9.99',
    deliveryAddress: 'Rua 654321',
    deliveryNumber: '123',
    saleDate: '2022-12-10T19:15:15.000Z',
    status: 'Entregue',
    seller: {
      name: 'Fulana Pereira Pereira',
    },
    saleProducts: [
      {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
        quantity: 1,
      },
      {
        id: 4,
        name: 'Brahma 600ml',
        price: '7.5',
        url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    userId: 6,
    sellerId: 9,
    totalPrice: '6.68',
    deliveryAddress: 'Rua 987654',
    deliveryNumber: '123',
    saleDate: '2022-12-10T19:13:15.000Z',
    status: 'Preparando',
    seller: {
      name: 'Fulana Pereira Pereira Pereira',
    },
    saleProducts: [
      {
        id: 5,
        name: 'Skol 269ml',
        price: '2.19',
        url_image: 'http://localhost:3001/images/skol_269ml.jpg',
        quantity: 1,
      },
      {
        id: 6,
        name: 'Skol Beats Senses 313ml',
        price: '4.49',
        url_image: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
        quantity: 1,
      },
    ],
  },
];

export default ListOrder;
