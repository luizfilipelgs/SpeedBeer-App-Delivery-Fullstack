const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/login.route');
const registerRoute = require('../routes/register.route');
const productsRoute = require('../routes/products.route');
const saleRoute = require('../routes/sale.route');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('public'));

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products', productsRoute);
app.use('/sales', saleRoute);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
