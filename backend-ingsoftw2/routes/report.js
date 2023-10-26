const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const reportController = require('../controllers/reportController');

// Middlewares
const passport = require('../middlewares/passport');
// Const validations = require("../controllers/validations");

const router = express.Router();

router.get(
  '/transferencias',
  passport,
  AsyncWrapper(reportController.getReporSuperAdmin),
);

module.exports = router;
