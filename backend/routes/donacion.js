const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const donacionController = require('../controllers/donacionController');

// Middlewares
const passport = require('../middlewares/passport');

const router = express.Router();

router.get('/', passport, AsyncWrapper(donacionController.getDonaciones));

router.get(
  '/disponible',
  passport,
  AsyncWrapper(donacionController.getDineroDisponible),
);

router.put(
  '/aprobar',
  passport,
  AsyncWrapper(donacionController.aprobarDonacion),
);

router.put('/pagado', passport, AsyncWrapper(donacionController.pagarDonacion));

router.post('/crear', passport, AsyncWrapper(donacionController.crearDonacion));

module.exports = router;
