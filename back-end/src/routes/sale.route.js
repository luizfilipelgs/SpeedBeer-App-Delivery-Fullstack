const express = require('express');
const saleController = require('../controllers/sale.controller');

const router = express.Router();

router.post('/register', saleController.register);
router.get('/orders/:id', saleController.getOrder);
router.get('/seller/:sellerId', saleController.getSeller);
router.put('/status/:saleId', saleController.update);
router.get('/seller', saleController.getAllSellers);
router.get('/orders/details/:saleId', saleController.getDetails);

module.exports = router;