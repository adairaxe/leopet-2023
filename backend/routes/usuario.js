const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const usuarioController = require('../controllers/usuarioController');

// Middlewares
const passport = require('../middlewares/passport');

const router = express.Router();

// Router.get("/:id", passport, AsyncWrapper(usuarioController.getInfo));
router.put('/:id', passport, AsyncWrapper(usuarioController.updateInfo));
router.patch(
  '/update',
  passport,
  AsyncWrapper(usuarioController.updatePassword),
);

module.exports = router;
