const express = require('express');
const loginController = require('../controllers/login.controller');
const { validateLogin } = require('../middlewares/login.middlewares');

const router = express.Router();

router.post('/', validateLogin, loginController.postLogin);
router.get('/users', loginController.getAllUsers);
router.delete('/users/remove/:id', loginController.remove);

module.exports = router;
