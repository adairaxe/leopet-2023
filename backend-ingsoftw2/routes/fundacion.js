const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const fundacionController = require('../controllers/fundacionController');

// Middlewares
const passport = require('../middlewares/passport');
// Const validations = require("../controllers/validations");

const router = express.Router();

router.post(
  '/create',
  passport,
  AsyncWrapper(fundacionController.createFundacion),
);

router.get('/', passport, AsyncWrapper(fundacionController.getFundaciones));

router.get(
  '/animales',
  passport,
  AsyncWrapper(fundacionController.getAnimalFundaciones),
);

router.get(
  "/padrinos/:fundacionId",  
  AsyncWrapper(fundacionController.getAnimalPadrinosFundacion)
);

router.get(
  "/padrinosCalificacion/:fundacionId",  
  AsyncWrapper(fundacionController.getAnimalPadrinosCalificacion)
);


router.put(
  '/update',
  passport,
  AsyncWrapper(fundacionController.updateInfoFundacion),
);

router.post(
  '/delete',
  //passport,
  AsyncWrapper(fundacionController.deleteFundacion),
);

router.post(
  '/register',
  AsyncWrapper(fundacionController.registerFundacion),
);

module.exports = router;
