const multer = require('multer');
const express = require('express');

const { AsyncWrapper } = require('../helpers');

// Controladores
const amazonS3 = require('../scripts/updateImage');

// Middlewares
const upload = multer({ dest: 'tempFiles/' });

const router = express.Router();

const NUMERO_FOTOS = 5;

router.post(
  '/uploadFile',
  upload.array('file', NUMERO_FOTOS),
  AsyncWrapper(amazonS3.uploadFile),
);

router.post(
  '/deleteFile',  
  AsyncWrapper(amazonS3.deleteFile),
);

module.exports = router;
