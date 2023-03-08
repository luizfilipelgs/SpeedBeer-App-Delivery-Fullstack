const express = require('express');
const loginController = require('../controllers/login.controller');
const { validateLogin } = require('../middlewares/login.middlewares');

const router = express.Router();

router.post('/', validateLogin, loginController.postLogin);
router.get('/users', loginController.getAllUsers);

module.exports = router;