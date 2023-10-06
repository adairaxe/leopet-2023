const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const notificacionController = require('../controllers/notificacionController');

// Middlewares
const passport = require('../middlewares/passport');
// Const validations = require("../controllers/validations");

const router = express.Router();

router.get(
  '/',
  passport,
  AsyncWrapper(notificacionController.getNotificaciones),
);

router.put(
  '/update/:notificacionId',
  passport,
  AsyncWrapper(notificacionController.updateNotificacion),
);

module.exports = router;
