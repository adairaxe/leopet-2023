const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const loginController = require('../controllers/loginController');

// Middlewares
const validations = require('../controllers/validations');

const router = express.Router();

router.post('/login', validations.login, AsyncWrapper(loginController.login));
router.post('/register', AsyncWrapper(loginController.register));

module.exports = router;
