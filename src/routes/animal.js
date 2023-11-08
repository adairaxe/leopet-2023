const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const animalController = require('../controllers/animalController');

// Middlewares
const passport = require('../middlewares/passport');
const validations = require('../controllers/validations');

const router = express.Router();

router.post(
  '/get/animals',
  passport,
  validations.allAnimals,
  AsyncWrapper(animalController.getAllAnimals),
);

router.post(
  '/get/animalsApp',
  passport,
  validations.allAnimals,
  AsyncWrapper(animalController.getAllAnimalsApp),
);

router.post(
  '/get/animalsFundacionApp',
  passport,
  validations.allAnimals,
  AsyncWrapper(animalController.getAllAnimalsFundacionApp),
);

router.get(
  '/get/:animalId',
  passport,
  validations.animal,
  AsyncWrapper(animalController.getAnimal),
);

router.get('/especies', passport, AsyncWrapper(animalController.getEspecies));

router.post(
  '/create',
  // passport,
  validations.createAnimal,
  AsyncWrapper(animalController.createAnimal),
);

router.put(
  '/update/:animalId',
  passport,
  validations.createAnimal,
  AsyncWrapper(animalController.updateAnimal),
);

router.delete(
  '/delete/:animalId',
  passport,
  validations.animal,
  AsyncWrapper(animalController.deleteAnimal),
);

router.get('/search', passport, AsyncWrapper(animalController.searchAnimal));

module.exports = router;
