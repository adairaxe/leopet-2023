const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const paypalController = require('../controllers/paypalController');

// Middlewares
const passport = require('../middlewares/passport');
// Const validations = require("../controllers/validations");

const router = express.Router();

router.post(
  '/create/product',
  passport,
  AsyncWrapper(paypalController.createProduct),
);

router.post(
  '/create/plan',
  passport,
  AsyncWrapper(paypalController.createPlan),
);

router.post(
  '/create/subscription',
  passport,
  AsyncWrapper(paypalController.generateSubscription),
);

router.post(
  '/verify/subscription',
  AsyncWrapper(paypalController.verifySubscription),
);

router.post(
  '/verify/payment/failed',
  AsyncWrapper(paypalController.verifyPaymentFailed),
);

router.post(
  '/cancel/subscription',
  AsyncWrapper(paypalController.verifyCancelSubscription),
);

router.post(
  '/cancel',
  passport,
  AsyncWrapper(paypalController.cancelSubscription),
);

module.exports = router;
