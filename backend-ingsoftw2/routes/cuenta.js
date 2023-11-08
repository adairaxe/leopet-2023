const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const cuentaController = require('../controllers/cuentaController');

// Middlewares
const passport = require('../middlewares/passport');
const validations = require('../controllers/validations');

const router = express.Router();

router.get(
  '/get/:id',
  passport,
  validations.cuentaInfo,
  AsyncWrapper(cuentaController.getCuentaBancaria),
);

router.get(
  '/getPrincipal/:id',
  passport,
  validations.cuentaInfo,
  AsyncWrapper(cuentaController.getCuentaBancariaPrincipal),
);

router.get(
  '/getAll/:id',
  passport,
  validations.cuentaInfo,
  AsyncWrapper(cuentaController.getAllCuentaBancaria),
);

router.put(
  '/update/:id',
  passport,
  validations.createUpdateCuentaBancaria,
  AsyncWrapper(cuentaController.updateCuentaBancaria),
);

router.put(
  '/updateCuentaID/:cuenta_id',
  passport,
  validations.createUpdateCuentaBancaria,
  AsyncWrapper(cuentaController.updateCuentaBancariaIDCuenta),
);

router.put(
  '/updatePrincipal/:fundacion_id',
  passport,
  validations.createUpdateCuentaBancaria,
  AsyncWrapper(cuentaController.updateCuentaPrincipal),
);

router.post(
  '/crear',
  passport,
  validations.createUpdateCuentaBancaria,
  AsyncWrapper(cuentaController.crearCuentaBancaria),
);

router.delete(
  '/delete/:cuentaId',
  passport,
  validations.createUpdateCuentaBancaria,
  AsyncWrapper(cuentaController.deleteCuenta),
);

module.exports = router;
