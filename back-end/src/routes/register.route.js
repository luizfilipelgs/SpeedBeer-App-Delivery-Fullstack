const express = require('express');
const registerController = require('../controllers/register.controller');
const { validateRegister } = require('../middlewares/register.middleware');

const router = express.Router();

router.post('/', validateRegister, registerController.createUser);

module.exports = router;