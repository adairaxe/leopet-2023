const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const manadaController = require('../controllers/manadaController');

// Middlewares
const passport = require('../middlewares/passport');
// Const validations = require("../controllers/validations");

const router = express.Router();

router.post('/create', passport, AsyncWrapper(manadaController.createManada));

router.post(
  '/add_animals',
  passport,
  AsyncWrapper(manadaController.addAnimals),
);

router.get('/all', passport, AsyncWrapper(manadaController.getManadas));

router.get('/search', passport, AsyncWrapper(manadaController.searchManada));

router.get(
  '/:manadaId',
  passport,
  AsyncWrapper(manadaController.getAnimalManadas),
);

router.post(
  '/delete_animal',
  passport,
  AsyncWrapper(manadaController.deleteAnimalManada),
);

router.post('/delete', passport, AsyncWrapper(manadaController.deleteManada));

router.post(
  '/update_info',
  passport,
  AsyncWrapper(manadaController.updateInfoManada),
);

module.exports = router;
