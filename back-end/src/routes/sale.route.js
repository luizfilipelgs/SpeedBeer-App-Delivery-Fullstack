const express = require('express');
const saleController = require('../controllers/sale.controller');

const router = express.Router();

router.post('/register', saleController.register);
router.get('/orders', saleController.getOrder);
router.get('/seller', saleController.getSeller);
router.put('/status', saleController.update);
router.get('/:saleId', saleController.getDetails);

module.exports = router;