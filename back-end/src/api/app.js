const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/login.route');
const registerRoute = require('../routes/register.route');
const productsRoute = require('../routes/products.route');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static('public'));

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products', productsRoute);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
